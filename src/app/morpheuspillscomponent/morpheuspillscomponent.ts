import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-morpheus',
  templateUrl: './morpheuspillscomponent.html',
  styleUrls: ['./morpheuspillscomponent.css'] // se vuoi aggiungere stili separati
})
export class MorpheusPillsComponent {

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['home']);
  }

}
