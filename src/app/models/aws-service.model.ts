export interface AwsService {
  id: string;
  name: string;
  category: string;
  iconPath: string;
  menus: string[];
}

export const AWS_SERVICES: AwsService[] = [
  {
    id: 'EC2',
    name: 'EC2 - Virtual Servers',
    category: 'Compute',
    iconPath: '/icons/aws/ec2.svg',
    menus: [
      'Instances',
      'Security Groups',
      'Elastic IPs',
      'Volumes',
      'Tags',
      'Details',
    ],
  },
  {
    id: 'LAMBDA',
    name: 'Lambda - Serverless Compute',
    category: 'Compute',
    iconPath: '/icons/aws/lambda.svg',
    menus: [
      'Function Overview',
      'Configuration',
      'Triggers',
      'Monitoring',
      'Tags',
    ],
  },
  {
    id: 'S3',
    name: 'S3 - Object Storage',
    category: 'Storage',
    iconPath: '/icons/aws/s3.svg',
    menus: [
      'Objects',
      'Properties',
      'Access Control',
      'Permissions',
      'Management',
      'Metrics',
    ],
  },
  {
    id: 'RDS',
    name: 'RDS - Relational Database',
    category: 'Database',
    iconPath: '/icons/aws/rds.svg',
    menus: [
      'Inbound Rules',
      'Outbound Rules',
      'Tags',
      'Details',
      'Network Interfaces',
      'Maintenance',
    ],
  },
];
