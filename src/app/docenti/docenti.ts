import { Component, OnInit, inject } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { Docente } from '../models/docente.model';
import { Academy } from '../services/academy';

@Component({
  selector: 'app-docenti',
  standalone: true,
  templateUrl: './docenti.html',
  styleUrls: ['./docenti.css'],
  imports: [CommonModule, RouterModule]
})
export class Docenti implements OnInit {
  trackById(_: number, d: Docente) { return d.id; }
  docenti: Docente[] = [];          // 👉 tipizzato
  loading = true;
  error: string | null = null;

  private readonly router = inject(Router);   // 👉 iniezione

  constructor(private academy: Academy) {}

  ngOnInit(): void {
    this.academy.getDocenti().subscribe({
      next : list => { this.docenti = list; this.loading = false; },
      error: err  => { this.error   = err.message; this.loading = false; }
    });
  }

  /** Naviga al form di modifica */
  modifica(id: number): void {
    this.router.navigate(['docenti', id]);
    //  --> /docenti/123/modifica
  }

  /** Elimina e rimuove localmente la riga */
  elimina(id: number): void {
    if (!confirm('Sei sicuro di voler eliminare questo docente?')) return;

    this.academy.deleteDocente(id).subscribe({
      next: () => {
        this.docenti = this.docenti.filter(d => d.id !== id);
      },
      error: err => console.error(err)
    });
  }
}
