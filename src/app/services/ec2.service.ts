import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private http = inject(HttpClient);

  // LocalEmu endpoint (e.g., LocalStack EC2 runs on localhost:4566)
  private apiUrl = 'http://localhost:4566';

  private instancesSignal = signal<Ec2Instance[]>([]);
  readonly instances = this.instancesSignal.asReadonly();

  constructor() {
    this.loadInstances();
  }

  // Fetch instances from LocalEmu
  loadInstances() {
    // Note: Depending on your LocalEmu implementation, you can map standard AWS EC2 JSON responses here
    this.http.get<any[]>(`${this.apiUrl}/instances`).subscribe({
      next: (data) => {
        const mapped = data.map((item) => ({
          id: item.InstanceId,
          name: item.Name || 'Unnamed-Instance',
          instanceType: item.InstanceType,
          state: item.State?.Name || 'running',
          statusCheck: '2/2 checks passed',
          availabilityZone: item.Placement?.AvailabilityZone || 'us-east-1a',
          publicIp: item.PublicIpAddress || '-',
          privateIp: item.PrivateIpAddress || '-',
        }));
        this.instancesSignal.set(mapped);
      },
      error: (err) => console.error('Failed to connect to LocalEmu:', err),
    });
  }

  createInstance(data: { name: string; instanceType: string; ami: string }) {
    this.http.post(`${this.apiUrl}/instances`, data).subscribe({
      next: () => this.loadInstances(), // Refresh list after creation
      error: (err) =>
        console.error('Error creating instance in LocalEmu:', err),
    });
  }

  setInstanceState(id: string, state: 'running' | 'stopped' | 'terminated') {
    this.http
      .post(`${this.apiUrl}/instances/${id}/state`, { state })
      .subscribe({
        next: () => this.loadInstances(), // Refresh list after modification
        error: (err) => console.error('Error updating instance state:', err),
      });
  }
}
