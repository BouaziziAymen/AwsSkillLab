import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

declare const Phaser: any;

@Component({
  selector: 'app-architecture-canvas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #canvasContainer
      class="w-full h-full rounded-lg overflow-hidden flex items-center justify-center"
    ></div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class ArchitectureCanvasComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  private game: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Only initialize Phaser if running inside a browser environment
    if (isPlatformBrowser(this.platformId)) {
      const config = {
        type: Phaser.AUTO,
        width: 600,
        height: 400,
        parent: this.canvasContainer.nativeElement,
        backgroundColor: '#020617',
        scene: {
          preload: this.preload,
          create: this.create,
        },
      };

      this.game = new Phaser.Game(config);
    }
  }

  private preload(this: any) {}

  private create(this: any) {
    this.add.rectangle(100, 80, 120, 50, 0x0f172a).setStrokeStyle(2, 0x06b6d4);
    this.add
      .text(100, 80, 'INTERNET\ngateway', {
        fontSize: '10px',
        color: '#38bdf8',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add.rectangle(100, 200, 140, 50, 0x0f172a).setStrokeStyle(2, 0x06b6d4);
    this.add
      .text(100, 200, 'LOAD BALANCER\nalb-public', {
        fontSize: '10px',
        color: '#38bdf8',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add.rectangle(380, 200, 160, 70, 0x1e1b4b).setStrokeStyle(2, 0xef4444);
    this.add
      .text(380, 185, 'DATABASE NODE\nards-production', {
        fontSize: '10px',
        color: '#f87171',
        align: 'center',
      })
      .setOrigin(0.5);
    this.add
      .text(380, 225, '⚠ LEAKY SECURITY GROUP', {
        fontSize: '9px',
        color: '#ef4444',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0x06b6d4, 0.8);
    graphics.strokeLineShape(new Phaser.Geom.Line(100, 105, 100, 175));

    graphics.lineStyle(2, 0xef4444, 0.8);
    graphics.strokeLineShape(new Phaser.Geom.Line(170, 200, 300, 200));
  }

  ngOnDestroy() {
    if (this.game) {
      this.game.destroy(true);
    }
  }
}
