import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ec2LaunchDialogComponent } from './ec2-launch-dialog.component';

describe('Ec2LaunchDialogComponent', () => {
  let component: Ec2LaunchDialogComponent;
  let fixture: ComponentFixture<Ec2LaunchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ec2LaunchDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ec2LaunchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
