import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';
import {
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';
import { CommonModule }       from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Academy }  from '../services/academy';
import { Discente }  from '../models/discente.model';

@Component({
  standalone: true,
  selector: 'app-discenti-new',
  templateUrl: './discenti-new.html',
  styleUrls: ['./discenti-new.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule ]
})
export class DiscentiNew implements OnInit {
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
    nomeDiscente:    this.fb.control('', Validators.required),
    cognomeDiscente: this.fb.control('', Validators.required),
  });

  get f() { return this.form.controls; }   // alias per il template

  /* ─────────── Lifecycle ──────── */
  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param !== null) {
      this.id = Number(param);
      this.isEdit = true;

      /* carica il record da modificare */
      this.academy.getDiscente(this.id).subscribe({
        next : discente => this.form.patchValue(discente),
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
      const dto: Discente = { id: this.id, ...this.form.getRawValue() };
      this.academy.updateDiscente(this.id, dto).subscribe({
        next : ()   => this.router.navigate(['discenti']),
        error: err  => console.error(err)
      });

    } else {
      /* --------- CREATE --------- */
      this.academy.createDiscente(this.form.getRawValue()).subscribe({
        next : ()   => this.router.navigate(['discenti']),
        error: err  => console.error(err)
      });
    }
  }
}
