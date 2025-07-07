import { Component, OnInit, inject } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { Discente } from '../models/discente.model';
import { Academy } from '../services/academy';

@Component({
  selector: 'app-discenti',
  standalone: true,
  templateUrl: './discenti.html',
  styleUrls: ['./discenti.css'],
  imports: [CommonModule, RouterModule]
})
export class Discenti implements OnInit {
  discenti: Discente[] = [];          // 👉 tipizzato
  loading = true;
  error: string | null = null;

  private readonly router = inject(Router);   // 👉 iniezione

  constructor(private academy: Academy) {}

  ngOnInit(): void {
    this.academy.getDiscenti().subscribe({
      next : list => { this.discenti = list; this.loading = false; },
      error: err  => { this.error   = err.message; this.loading = false; }
    });
  }

  /** Naviga al form di modifica */
  modifica(id: number): void {
    this.router.navigate(['discenti', id]);
    //  --> /discenti/123/modifica
  }

  /** Elimina e rimuove localmente la riga */
  elimina(id: number): void {
    if (!confirm('Sei sicuro di voler eliminare questo discente?')) return;

    this.academy.deleteDiscente(id).subscribe({
      next: () => {
        this.discenti = this.discenti.filter(d => d.id !== id);
      },
      error: err => console.error(err)
    });
  }
}
