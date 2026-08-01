import { Injectable, signal } from '@angular/core';

export interface SecurityGroupRule {
  id: string;
  service: string;
  port: number;
  protocol: string;
  source: string;
  isLeaky: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AwsService {
  // Reactive state signals
  public rules = signal<SecurityGroupRule[]>([
    {
      id: 'rule-1',
      service: 'RDS',
      port: 5432,
      protocol: 'TCP',
      source: '0.0.0.0/0',
      isLeaky: true,
    },
  ]);

  public isDatabaseSecure = signal<boolean>(false);

  constructor() {
    // Evaluate initial security state on bootstrap
    this.evaluateSecurity();
  }

  addRule(rule: Omit<SecurityGroupRule, 'id' | 'isLeaky'>) {
    const isLeaky =
      rule.service === 'RDS' &&
      rule.port === 5432 &&
      rule.source === '0.0.0.0/0';

    const newRule: SecurityGroupRule = {
      ...rule,
      id: 'rule-' + Date.now(),
      isLeaky,
    };

    this.rules.update((current) => [...current, newRule]);
    this.evaluateSecurity();
  }

  removeRule(id: string) {
    this.rules.update((current) => current.filter((r) => r.id !== id));
    this.evaluateSecurity();
  }

  evaluateSecurity() {
    // Database is secure if no RDS rule exposes port 5432 to 0.0.0.0/0
    const hasPublicDatabase = this.rules().some(
      (r) => r.service === 'RDS' && r.port === 5432 && r.source === '0.0.0.0/0',
    );
    this.isDatabaseSecure.set(!hasPublicDatabase);
  }
}
