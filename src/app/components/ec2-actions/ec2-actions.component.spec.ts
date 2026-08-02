import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ec2ActionsComponent } from './ec2-actions.component';

describe('Ec2ActionsComponent', () => {
  let component: Ec2ActionsComponent;
  let fixture: ComponentFixture<Ec2ActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ec2ActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ec2ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
