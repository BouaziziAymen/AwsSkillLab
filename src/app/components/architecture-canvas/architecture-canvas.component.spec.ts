import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectureCanvasComponent } from './architecture-canvas.component';

describe('ArchitectureCanvasComponent', () => {
  let component: ArchitectureCanvasComponent;
  let fixture: ComponentFixture<ArchitectureCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitectureCanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchitectureCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
