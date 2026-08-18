import { Injectable, signal } from '@angular/core';
import {
  EC2Client,
  DescribeInstancesCommand,
  RunInstancesCommand,
  StartInstancesCommand,
  StopInstancesCommand,
  TerminateInstancesCommand,
} from '@aws-sdk/client-ec2';

@Injectable({
  providedIn: 'root',
})
export class Ec2Service {
  // Initialize the EC2 client pointing to LocalEmu with dummy credentials
  private ec2Client = new EC2Client({
    region: 'us-east-1',
    endpoint: 'http://localhost:4566',
    credentials: {
      accessKeyId: 'test',
      secretAccessKey: 'test',
    },
  });

  private instancesSignal = signal<any[]>([]);
  readonly instances = this.instancesSignal.asReadonly();

  constructor() {
    this.loadInstances();
  }

  // Equivalent to: aws --endpoint-url=http://localhost:4566 ec2 describe-instances
  async loadInstances() {
    try {
      const command = new DescribeInstancesCommand({});
      const response = await this.ec2Client.send(command);

      const reservations = response.Reservations || [];
      const instances: any[] = [];
      for (const res of reservations) {
        if (res.Instances) {
          instances.push(...res.Instances);
        }
      }

      const mapped = instances
        .map((item) => ({
          id: item.InstanceId,
          name:
            item.Tags?.find((t: any) => t.Key === 'Name')?.Value ||
            'Unnamed-Instance',
          instanceType: item.InstanceType,
          state: item.State?.Name || 'running',
          statusCheck:
            item.State?.Name === 'running'
              ? '2/2 checks passed'
              : 'Initializing',
          availabilityZone: item.Placement?.AvailabilityZone || 'us-east-1a',
          publicIp: item.PublicIpAddress || '127.0.0.1',
          privateIp: item.PrivateIpAddress || '172.31.0.10',
          ami: item.ImageId || 'amzn2023',
          launchTime: item.LaunchTime,
        }))
        .filter((item) => item.state !== 'terminated');

      this.instancesSignal.set(mapped);
    } catch (err) {
      console.error('Failed to fetch instances from LocalEmu:', err);
    }
  }

  async createInstance(data: {
    name: string;
    instanceType: string;
    ami?: string;
  }) {
    try {
      const targetAmi = data.ami || 'amzn2023';

      // UserData script configured to create ec2-user with bash as the default login shell
      const userDataScript = `#!/bin/bash
export DEBIAN_FRONTEND=noninteractive

echo "=== Bootstrapping LocalEmu EC2 Instance ==="

# 1. Install standard tools and sudo
if command -v apt-get &> /dev/null; then
  apt-get update -y && apt-get install -y sudo curl wget bash
elif command -v yum &> /dev/null; then
  yum install -y sudo curl wget bash
elif command -v apk &> /dev/null; then
  apk update && apk add sudo curl wget bash
fi

# 2. Ensure robust /usr/bin/sudo fallback wrapper exists
if [ ! -f /usr/bin/sudo ]; then
  cat << 'EOF' > /usr/bin/sudo
#!/bin/bash
exec "$@"
EOF
  chmod +x /usr/bin/sudo
fi

# 3. Create ec2-user with /bin/bash explicitly as the login shell and passwordless sudo
if ! id -u ec2-user &>/dev/null; then
  useradd -m -s /bin/bash ec2-user
  usermod -aG sudo ec2-user 2>/dev/null || true
  echo "ec2-user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
else
  chsh -s /bin/bash ec2-user
fi

# 4. Force default interactive shell sessions for root and ec2-user to spin up bash
echo "exec /bin/bash" >> /root/.bashrc
echo "exec /bin/bash" >> /home/ec2-user/.bashrc

echo "=== EC2 Bootstrap Complete ==="
`;

      const encodedUserData = btoa(userDataScript);

      const command = new RunInstancesCommand({
        ImageId: targetAmi,
        InstanceType: data.instanceType as any,
        MinCount: 1,
        MaxCount: 1,
        UserData: encodedUserData,
        MetadataOptions: {
          HttpTokens: 'required',
          HttpPutResponseHopLimit: 2,
        },
        TagSpecifications: [
          {
            ResourceType: 'instance',
            Tags: [
              { Key: 'Name', Value: data.name },
              { Key: 'Environment', Value: 'Development' },
              { Key: 'ManagedBy', Value: 'LocalEmu' },
            ],
          },
        ],
      });

      const response = await this.ec2Client.send(command);
      const instanceId = response.Instances?.[0]?.InstanceId;

      if (instanceId) {
        await this.setInstanceState(instanceId, 'running');
      }

      await this.loadInstances();
    } catch (err) {
      console.error('Error creating instance in LocalEmu:', err);
    }
  }

  // Equivalent to AWS SDK EC2 state change commands
  async setInstanceState(
    id: string,
    state: 'running' | 'stopped' | 'terminated',
  ) {
    try {
      if (state === 'running') {
        const command = new StartInstancesCommand({ InstanceIds: [id] });
        await this.ec2Client.send(command);
      } else if (state === 'stopped') {
        const command = new StopInstancesCommand({ InstanceIds: [id] });
        await this.ec2Client.send(command);
      } else if (state === 'terminated') {
        const command = new TerminateInstancesCommand({ InstanceIds: [id] });
        await this.ec2Client.send(command);
      }
      await this.loadInstances();
    } catch (err) {
      console.error(`Error updating instance ${id} state to ${state}:`, err);
    }
  }
}
