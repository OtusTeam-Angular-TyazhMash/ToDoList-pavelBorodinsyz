import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board-item-view',
  templateUrl: './board-item-view.component.html',
  styleUrl: './board-item-view.component.scss'
})
export class BoardItemViewComponent {
  @Input({ required: true }) title!: string;

}
