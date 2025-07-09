import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';   // se usi routerLink nel template

@Component({
  selector: 'app-navbar',
  standalone: true,                 // 👈 necessario se lo importi in altri stand-alone
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],      // 👈 plurale
  imports: [RouterModule]           // se usi *ngIf/*ngFor aggiungi anche CommonModule
})
export class Navbar {
    constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['home']);
  }
 }
