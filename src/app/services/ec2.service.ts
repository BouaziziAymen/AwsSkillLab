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
          statusCheck: '2/2 checks passed',
          availabilityZone: item.Placement?.AvailabilityZone || 'us-east-1a',
          publicIp: item.PublicIpAddress || '-',
          privateIp: item.PrivateIpAddress || '-',
        }))
        .filter((item) => item.state !== 'terminated');

      this.instancesSignal.set(mapped);
    } catch (err) {
      console.error('Failed to fetch instances from LocalEmu:', err);
    }
  }
  // Equivalent to: aws --endpoint-url=http://localhost:4566 ec2 run-instances ...
  async createInstance(data: {
    name: string;
    instanceType: string;
    ami?: string;
  }) {
    try {
      const targetAmi = data.ami || 'amzn2023';

      // Bootstrap script using the tarball variant, which avoids systemd/rpm restrictions inside lightweight containers
      const userDataScript = `#!/bin/bash
cd /tmp
curl -sO https://s3.amazonaws.com/amazon-ssm-agent/snap/linux_amd64/amazon-ssm-agent.tar.gz
mkdir -p /var/amazon-ssm-agent
tar -xzf amazon-ssm-agent.tar.gz -C /var/amazon-ssm-agent --strip-components=1

# Launch the SSM agent in the background so it maintains the control plane handshake
nohup /var/amazon-ssm-agent/amazon-ssm-agent > /var/log/amazon-ssm-agent.log 2>&1 &
`;

      // Base64 encode the user data for the EC2 API
      const encodedUserData = btoa(userDataScript);

      const command = new RunInstancesCommand({
        ImageId: targetAmi,
        InstanceType: data.instanceType as any,
        MinCount: 1,
        MaxCount: 1,
        UserData: encodedUserData,
        TagSpecifications: [
          {
            ResourceType: 'instance',
            Tags: [
              {
                Key: 'Name',
                Value: data.name,
              },
              {
                Key: 'DockerImage',
                Value: targetAmi,
              },
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
      await this.loadInstances(); // Refresh list after modification
    } catch (err) {
      console.error('Error updating instance state:', err);
    }
  }
}
