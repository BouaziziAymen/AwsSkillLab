import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ec2ConnectDialogComponent } from './ec2-connect-dialog.component';

describe('Ec2ConnectDialogComponent', () => {
  let component: Ec2ConnectDialogComponent;
  let fixture: ComponentFixture<Ec2ConnectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ec2ConnectDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ec2ConnectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
