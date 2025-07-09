import {
  AfterViewInit, OnDestroy, Component,
  Inject, PLATFORM_ID, HostListener
} from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';

@Component({
  selector   : 'app-home',
  standalone : true,                // 👈 serve per usare "imports"
  templateUrl: './home.html',
  styleUrls  : ['./home.css'],
  imports    : [
    CommonModule,                   // *ngIf / *ngFor se un domani servono
    RouterModule                    // 👈 abilita routerLink / routerLinkActive
  ]
})
export class Home implements AfterViewInit, OnDestroy {

  private isBrowser = false;
  private ctx!: CanvasRenderingContext2D;
  private drops: number[] = [];
  private animationId = 0;
  private fontSize = 14;
  private letters = 'アイウエオカキクケコサシスセソ0123456789'.split('');

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT)    private doc: Document
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /* ---------- animazione Matrix: invariata ------------------------- */
  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const canvas = this.doc.getElementById('matrix-canvas') as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d')!;

    const init = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / this.fontSize);
      this.drops = Array(cols).fill(1);
    };

   const draw = () => {
  // Sfuma leggermente lo sfondo per lasciare una scia
  this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // più alto per una scia meno persistente
  this.ctx.fillRect(0, 0, canvas.width, canvas.height);

  this.ctx.font = `${this.fontSize}px monospace`;

  this.drops.forEach((y, i) => {
    // Colore casuale per ogni simbolo ad ogni frame
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.ctx.fillStyle = `rgb(${r},${g},${b})`;

    // Simbolo casuale
    const text = this.letters[Math.floor(Math.random() * this.letters.length)];

    // Disegna simbolo alla posizione corrente
    this.ctx.fillText(text, i * this.fontSize, y * this.fontSize);

    // Aggiorna posizione y per far scorrere verso il basso
    if (y * this.fontSize > canvas.height && Math.random() > 0.975) {
      this.drops[i] = 0;
    } else {
      this.drops[i] = y + 1;
    }
  });

  this.animationId = requestAnimationFrame(draw);
};

 /*const draw = () => {
      this.ctx.fillStyle = 'rgba(0,0,0,0.05)';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);

      this.ctx.fillStyle = '#0f0';
      this.ctx.font = `${this.fontSize}px monospace`;

      this.drops.forEach((y, i) => {
        const text = this.letters[Math.floor(Math.random() * this.letters.length)];
        this.ctx.fillText(text, i * this.fontSize, y * this.fontSize);
        this.drops[i] =
          (y * this.fontSize > canvas.height || Math.random() > 0.975) ? 0 : y + 1;
      });

      this.animationId = requestAnimationFrame(draw);
    };
*/

    init();
    draw();
  }

  @HostListener('window:resize')
  onResize() {
    if (!this.isBrowser) return;
    cancelAnimationFrame(this.animationId);
    this.ngAfterViewInit();   // ridisegna con nuove dimensioni
  }

  ngOnDestroy(): void {
    if (this.isBrowser) cancelAnimationFrame(this.animationId);
  }
}
