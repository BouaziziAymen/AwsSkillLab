import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolePanelComponent } from './console-panel.component';

describe('ConsolePanelComponent', () => {
  let component: ConsolePanelComponent;
  let fixture: ComponentFixture<ConsolePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsolePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
