import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ec2DashboardComponent } from './ec2-dashboard.component';

describe('Ec2DashboardComponent', () => {
  let component: Ec2DashboardComponent;
  let fixture: ComponentFixture<Ec2DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ec2DashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ec2DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
