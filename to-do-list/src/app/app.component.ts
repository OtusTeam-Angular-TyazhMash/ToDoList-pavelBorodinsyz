import { Component } from '@angular/core';
import { translations } from '../locale/translations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'to-do-list';
  readonly translations = translations;
}
