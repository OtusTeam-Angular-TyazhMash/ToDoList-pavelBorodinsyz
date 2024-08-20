import {ApplicationRef, ComponentRef, Directive, ElementRef, EmbeddedViewRef,HostListener, Input, OnDestroy, createComponent} from '@angular/core';
import { TooltipComponent } from '../shared/tooltip/tooltip.component';

@Directive({
    selector: '[appTooltip]',
})
export class TooltipDirective implements OnDestroy {
    @Input() appTooltip = '';
    private componentRef: ComponentRef<TooltipComponent> | null = null;

    constructor(
        private elementRef: ElementRef,
        private applicationRef: ApplicationRef,
    ) { }

    @HostListener('mouseenter')
    onMouseEnter(): void {
        if (this.componentRef === null) {
            this.componentRef = createComponent(
                TooltipComponent, {
                environmentInjector: this.applicationRef.injector,
            });
            this.applicationRef.attachView(this.componentRef.hostView)
            const domElement = (this.componentRef.hostView as EmbeddedViewRef<HTMLElement>).rootNodes[0] as HTMLElement;
            document.body.appendChild(domElement);
            this.setTooltipComponentProperties();
        }
    }

    private setTooltipComponentProperties() {
        if (this.componentRef !== null) {
            this.componentRef.instance.tooltip = this.appTooltip;
            const { left, right, top } =
                this.elementRef.nativeElement.getBoundingClientRect();
            this.componentRef.instance.left = (right - left) / 2 + left;
            this.componentRef.instance.top = top;
        }
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        this.destroy();
    }

    ngOnDestroy(): void {
        this.destroy();
    }

    private destroy(): void {
        if (this.componentRef !== null) {
            this.applicationRef.detachView(this.componentRef.hostView);
            this.componentRef.destroy();
            this.componentRef = null
        }
    }
}