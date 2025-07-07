// src/app/core/academy.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Docente }  from '../models/docente.model';
import { Discente } from '../models/discente.model';
import { Corso }    from '../models/corso.model';

@Injectable({ providedIn: 'root' })
export class Academy {

  private http = inject(HttpClient);

  private apiAuth  = 'http://localhost:8080';   // Docenti + Discenti
  private apiCorsi = 'http://localhost:8081';   // Corsi

  /* ---------- READ ---------- */
  getDocenti():  Observable<Docente[]>  { return this.http.get<Docente[]>(  `${this.apiAuth}/docenti/lista`   );}
  getDocente(id: number) {
  return this.http.get<Docente>(`${this.apiAuth}/docenti/${id}`);}
  getDiscenti(): Observable<Discente[]> { return this.http.get<Discente[]>( `${this.apiAuth}/discenti/lista` ); }
  getDiscente(id: number) {
  return this.http.get<Discente>(`${this.apiAuth}/discenti/${id}`);}
  getCorsi():    Observable<Corso[]>    { return this.http.get<Corso[]>(    `${this.apiCorsi}/corsi/lista`   ); }

  /* ---------- CREATE -------- */
  createDocente(b: Docente):   Observable<Docente>  { return this.http.post<Docente>(  `${this.apiAuth}/docenti/nuovo`,   b); }
  createDiscente(b: Discente): Observable<Discente> { return this.http.post<Discente>(`${this.apiAuth}/discenti/nuovo`, b); }
  createCorso(b: Corso):       Observable<Corso>    { return this.http.post<Corso>(   `${this.apiCorsi}/corsi/nuovo`,   b); }

  /* ---------- UPDATE -------- */
  updateDocente(id: number,  b: Docente)   { return this.http.put<void>(`${this.apiAuth}/docenti/${id}`,   b); }
  updateDiscente(id: number, b: Discente)  { return this.http.put<void>(`${this.apiAuth}/discenti/${id}`, b); }
  updateCorso(id: number,    b: Corso)     { return this.http.put<void>(`${this.apiCorsi}/corsi/${id}`,   b); }

  /* ---------- DELETE -------- */
  deleteDocente(id: number)  { return this.http.delete<void>(`${this.apiAuth}/docenti/delete/${id}`); }
  deleteDiscente(id: number) { return this.http.delete<void>(`${this.apiAuth}/discenti/delete/${id}`); }
  deleteCorso(id: number)    { return this.http.delete<void>(`${this.apiCorsi}/corsi/delete/${id}`); }
}
