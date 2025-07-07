import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { RouterModule }      from '@angular/router';

import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { Academy } from '../services/academy';
import { Corso }   from '../models/corso.model';

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

  constructor(private academy: Academy) {}

  ngOnInit(): void {
    this.academy.getCorsi().subscribe({
      next : (res: Corso[]) => {
        this.corsi   = res;
        this.loading = false;
      },
      error: (err: any) => {
        this.error   = err.message;
        this.loading = false;
      }
    });
  }
}
