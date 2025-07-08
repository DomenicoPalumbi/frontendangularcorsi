import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Academy } from '../services/academy';
import { Corso } from '../models/corso.model';

@Component({
  selector: 'app-corsi',
  standalone: true,
  templateUrl: './corsi.html',
  styleUrls: ['./corsi.css'],
  imports: [CommonModule, RouterModule]
})
export class Corsi implements OnInit {

  corsi: Corso[] = [];
  loading = true;
  error: string | null = null;

  private academy = inject(Academy);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadCorsi();
  }

  loadCorsi(): void {
    this.academy.getCorsi().subscribe({
      next: (res: Corso[]) => {
        this.corsi = res;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  /** Naviga al form di modifica del corso */
  modifica(id: number): void {
    this.router.navigate(['corsi', id]);
    // es: /corsi/123
  }

  /** Elimina un corso e aggiorna la lista localmente */
  elimina(id: number): void {
    if (!confirm('Sei sicuro di voler eliminare questo corso?')) return;

    this.academy.deleteCorso(id).subscribe({
      next: () => {
        this.corsi = this.corsi.filter(c => c.id !== id);
      },
      error: err => {
        console.error(err);
        alert('Errore durante l\'eliminazione del corso.');
      }
    });
  }
}
