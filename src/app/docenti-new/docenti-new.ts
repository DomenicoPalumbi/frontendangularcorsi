// src/app/docenti-new/docenti-new.ts
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';
import {
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';
import { CommonModule }       from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { Academy }  from '../services/academy';
import { Docente }  from '../models/docente.model';

@Component({
  standalone: true,
  selector: 'app-docenti-new',
  templateUrl: './docenti-new.html',
  styleUrls: ['./docenti-new.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class DocentiNew implements OnInit {
  /* ───────────── DI ───────────── */
  private fb      = inject(NonNullableFormBuilder);
  private route   = inject(ActivatedRoute);
  private router  = inject(Router);
  private academy = inject(Academy);

  /* ─────────── Stato ──────────── */
  id?: number;          // presente solo in edit
  isEdit = false;
  submitted = false;    // usato nel template

  /* ─────────── Form ───────────── */
  form = this.fb.group({
    nomeDocente:    this.fb.control('', Validators.required),
    cognomeDocente: this.fb.control('', Validators.required),
    emailDocente:   this.fb.control('', [Validators.required, Validators.email])
  });

  get f() { return this.form.controls; }   // alias per il template

  /* ─────────── Lifecycle ──────── */
  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param !== null) {
      this.id = Number(param);
      this.isEdit = true;

      /* carica il record da modificare */
      this.academy.getDocente(this.id).subscribe({
        next : docente => this.form.patchValue(docente),
        error: err     => console.error(err)
      });
    }
  }

  /* ─────── Submit (POST / PUT) ─── */
  onSave(): void {
    this.submitted = true;

    if (this.form.invalid) return;

    if (this.isEdit && this.id !== undefined) {
      /* --------- UPDATE --------- */
      const dto: Docente = { id: this.id, ...this.form.getRawValue() };
      this.academy.updateDocente(this.id, dto).subscribe({
        next : ()   => this.router.navigate(['docenti']),
        error: err  => console.error(err)
      });

    } else {
      /* --------- CREATE --------- */
      this.academy.createDocente(this.form.getRawValue()).subscribe({
        next : ()   => this.router.navigate(['docenti']),
        error: err  => console.error(err)
      });
    }
  }
}
