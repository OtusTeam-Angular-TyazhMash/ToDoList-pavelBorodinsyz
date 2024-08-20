import { Component } from '@angular/core';
import { ToastService } from '../../service/toast.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
    constructor(private toastService: ToastService) { }

    get getMessages() {
        return this.toastService.getToastMessages;
    }
}