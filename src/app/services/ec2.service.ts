import { Injectable, signal } from '@angular/core';

export interface Ec2Instance {
  id: string;
  name: string;
  instanceType: string;
  state: 'running' | 'stopped' | 'pending' | 'terminated';
  statusCheck: string;
  availabilityZone: string;
  publicIp: string;
  privateIp: string;
}

@Injectable({ providedIn: 'root' })
export class Ec2Service {
  // Initial sample instances mirroring real AWS Console layouts
  private instancesSignal = signal<Ec2Instance[]>([
    {
      id: 'i-01a2b3c4d5e6f7g8h',
      name: 'Prod-WebServer-01',
      instanceType: 't3.medium',
      state: 'running',
      statusCheck: '2/2 checks passed',
      availabilityZone: 'us-east-1a',
      publicIp: '54.210.12.45',
      privateIp: '172.31.16.88',
    },
    {
      id: 'i-08h7g6f5e4d3c2b1a',
      name: 'Dev-Worker-Node',
      instanceType: 't3.micro',
      state: 'stopped',
      statusCheck: 'N/A',
      availabilityZone: 'us-east-1b',
      publicIp: '-',
      privateIp: '172.31.22.104',
    },
  ]);

  readonly instances = this.instancesSignal.asReadonly();

  createInstance(data: { name: string; instanceType: string; ami: string }) {
    const newInstance: Ec2Instance = {
      id: `i-${Math.random().toString(16).substring(2, 18)}`,
      name: data.name || 'Unnamed-Instance',
      instanceType: data.instanceType,
      state: 'running',
      statusCheck: 'Initializing',
      availabilityZone: 'us-east-1a',
      publicIp: `54.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      privateIp: `172.31.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    };

    this.instancesSignal.update((list) => [newInstance, ...list]);
  }

  setInstanceState(id: string, state: 'running' | 'stopped' | 'terminated') {
    this.instancesSignal.update((list) =>
      list.map((i) =>
        i.id === id
          ? {
              ...i,
              state,
              statusCheck: state === 'running' ? '2/2 checks passed' : 'N/A',
            }
          : i,
      ),
    );
  }
}
