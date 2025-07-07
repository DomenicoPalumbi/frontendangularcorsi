import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  standalone: true,                        // 👈 obbligatorio
  templateUrl: './app.html',
  styleUrls: ['./app.css'],                // 👈 plurale
  imports: [
    RouterOutlet,                          // per <router-outlet>
    Navbar,                                 // <app-navbar>
    Footer                                 // <app-footer>
  ]
})
export class App {
  protected title = 'frontendcorsi';
}
