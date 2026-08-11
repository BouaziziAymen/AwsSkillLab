import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ec2TerminalComponent } from './ec2-terminal.component';

describe('Ec2TerminalComponent', () => {
  let component: Ec2TerminalComponent;
  let fixture: ComponentFixture<Ec2TerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ec2TerminalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ec2TerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
