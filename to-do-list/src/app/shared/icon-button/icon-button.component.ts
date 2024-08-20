import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-button',
  templateUrl: './icon-button.component.html'
})
export class IconButtonComponent {
  @Input() icon: string = "more_vert";
}
