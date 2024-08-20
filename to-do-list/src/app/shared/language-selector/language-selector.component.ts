import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-language-selector',
    templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent {
    constructor(public router: Router) { }
}
