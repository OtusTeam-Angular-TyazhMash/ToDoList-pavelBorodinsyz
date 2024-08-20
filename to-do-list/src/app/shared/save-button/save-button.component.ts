import { Component, Input } from '@angular/core';

@Component({
  selector: 'save-button',
  templateUrl: './save-button.component.html'
})
export class SaveButtonComponent {
  @Input() type: string = 'none';
}
