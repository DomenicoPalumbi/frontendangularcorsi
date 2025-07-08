import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Academy } from '../services/academy';
import { Corso } from '../models/corso.model';
import { Discente } from '../models/discente.model';

@Component({
  standalone: true,
  selector: 'app-corsi-new',
  templateUrl: './corsi-new.html',
  styleUrls: ['./corsi-new.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class CorsiNew implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private academy = inject(Academy);

  id?: number;
  isEdit = false;
  submitted = false;

  docenti: any[] = [];
  discenti: Discente[] = [];

  form = this.fb.group({
    nome: ['', Validators.required],
    annoAccademico: [0, [Validators.required, Validators.min(1900)]],
    nomeDocente: ['', Validators.required],
    cognomeDocente: ['', Validators.required],
    discenti: this.fb.control<Discente[]>([], Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.loadDocenti();
    this.loadDiscenti();

    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.id = Number(param);
      this.isEdit = true;
      this.loadCorso(this.id);
    }
  }

  private loadDocenti(): void {
    this.academy.getDocenti().subscribe({
      next: data => this.docenti = data,
      error: err => console.error('Errore caricamento docenti', err)
    });
  }

  private loadDiscenti(): void {
    this.academy.getDiscenti().subscribe({
      next: data => this.discenti = data,
      error: err => console.error('Errore caricamento discenti', err)
    });
  }

  private loadCorso(id: number): void {
    this.academy.getCorso(id).subscribe({
      next: corso => {
        this.form.patchValue({
          nome: corso.nome,
          annoAccademico: corso.annoAccademico,
          nomeDocente: corso.nomeDocente,
          cognomeDocente: corso.cognomeDocente,
          discenti: corso.discenti || []
        });
      },
      error: err => console.error('Errore caricamento corso', err)
    });
  }

  onToggleDiscente(discente: Discente): void {
    const selected = this.form.controls['discenti'].value as Discente[];
    const index = selected.findIndex(d => d.id === discente.id);
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(discente);
    }
    this.form.controls['discenti'].setValue([...selected]);
  }

  isDiscenteSelected(discente: Discente): boolean {
    const selected = this.form.controls['discenti'].value as Discente[];
    return selected.some(d => d.id === discente.id);
  }

  onSave(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    const dto: Corso = {
      id: this.id ?? 0,
      ...this.form.getRawValue()
    };

    if (this.isEdit && this.id !== undefined) {
      this.academy.updateCorso(this.id, dto).subscribe({
        next: () => this.router.navigate(['corsi']),
        error: err => console.error('Errore aggiornamento corso', err)
      });
    } else {
      this.academy.createCorso(dto).subscribe({
        next: () => this.router.navigate(['corsi']),
        error: err => console.error('Errore creazione corso', err)
      });
    }
  }
}
