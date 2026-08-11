import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  viewChild,
  input,
  output,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ec2-terminal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center z-50 p-6"
    >
      <div
        class="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-4xl h-[600px] flex flex-col shadow-2xl overflow-hidden"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800"
        >
          <div class="flex items-center space-x-2">
            <span
              class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"
            ></span>
            <span class="font-mono text-xs text-slate-200"
              >Hosted Terminal: localemu-ec2-{{ instanceId() }}</span
            >
          </div>
          <button
            (click)="close.emit()"
            class="text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            ✕
          </button>
        </div>
        <!-- Terminal Host Element -->
        <div
          #terminalContainer
          (click)="focusTerminal()"
          class="flex-1 p-4 bg-black overflow-hidden cursor-text"
        ></div>
      </div>
    </div>
  `,
})
export class Ec2TerminalComponent implements AfterViewInit, OnDestroy {
  instanceId = input.required<string>();
  close = output<void>();

  private terminalElement = viewChild.required<ElementRef>('terminalContainer');
  private term: any;
  private fitAddon: any;
  private ws!: WebSocket;
  private platformId = inject(PLATFORM_ID);

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const { Terminal } = await import('xterm');
      const { FitAddon } = await import('xterm-addon-fit');

      this.term = new Terminal({
        cursorBlink: true,
        theme: {
          background: '#000000',
          foreground: '#e2e8f0',
          cursor: '#38bdf8',
        },
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: 13,
      });

      this.fitAddon = new FitAddon();
      this.term.loadAddon(this.fitAddon);
      this.term.open(this.terminalElement().nativeElement);

      setTimeout(() => {
        this.fitAddon.fit();
        this.term.focus();
      }, 150);

      // Connect to the backend WebSocket server
      this.ws = new WebSocket(
        `ws://localhost:4567/ws/ec2/terminal/${this.instanceId()}`,
      );

      this.ws.onmessage = (event) => {
        this.term.write(event.data);
      };

      this.term.onData((data: string) => {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(data);
        }
      });
    }
  }

  focusTerminal() {
    if (this.term) {
      this.term.focus();
    }
  }

  ngOnDestroy() {
    if (this.ws) this.ws.close();
    if (this.term) this.term.dispose();
  }
}
