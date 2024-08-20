import { ApplicationRef, ComponentRef, EmbeddedViewRef, Injectable, createComponent } from "@angular/core";
import { ToastComponent } from "../shared/toast/toast.component";
import { BehaviorSubject, delay, map, take } from "rxjs";

export interface Toast {
    id: number;
    message: string;
}

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private componentRef: ComponentRef<ToastComponent> | null = null;
    private toasts$: BehaviorSubject<Array<Toast>> = new BehaviorSubject<Array<Toast>>([]);
    private readonly TOAST_TIMEOUT = 5000;

    constructor(
        private applicationRef: ApplicationRef) { }

    get getToastMessages() {
        return this.toasts$.asObservable().pipe(
            map(items => items.map(item => item.message)),
        );
    }

    showToast(message: Toast["message"]): void {
        this.createToastComponent();
        const toast = {
            id: Math.max(...this.toasts$.value.map(item => item.id), -1) + 1,
            message: message,
        }
        this.toasts$.next([...this.toasts$.value, toast]);
        this.toasts$.pipe(
            delay(this.TOAST_TIMEOUT),
            take(1),
        ).subscribe(() => {
            this.deleteToast(toast);
            if (this.toasts$.value.length === 0)
                this.destroyToastComponent();
        });
    }

    private createToastComponent(): void {
        if (this.componentRef === null) {
            this.componentRef = createComponent(
                ToastComponent, {
                environmentInjector: this.applicationRef.injector,
            });
            this.applicationRef.attachView(this.componentRef.hostView)
            const domElement = (this.componentRef.hostView as EmbeddedViewRef<HTMLElement>).rootNodes[0] as HTMLElement;
            document.body.appendChild(domElement);
        }
    }

    private destroyToastComponent(): void {
        if (this.componentRef !== null) {
            this.applicationRef.detachView(this.componentRef.hostView);
            this.componentRef.destroy();
            this.componentRef = null
        }
    }

    private deleteToast(toast: Toast): void {
        const toastIndex = this.toasts$.value.findIndex(item => item.id === toast.id);
        if (toastIndex > -1)
            this.toasts$.value.splice(toastIndex, 1);
    }
}