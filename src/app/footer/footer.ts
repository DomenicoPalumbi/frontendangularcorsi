import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,                 // 👈 necessario
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']       // 👈 plurale
  // imports: []  se ti servono NgIf/NgFor aggiungi CommonModule qui
})
export class Footer { }
