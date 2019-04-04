import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Helper } from './helper';

export abstract class GenericFormatDirective implements OnChanges {
    protected helper: Helper;
    protected loaded = false;
    protected detailModeLoaded = false;
    protected onChange: any;
    protected onTouched: any;

    constructor(public el: ElementRef) {
        this.helper = new Helper();
    }

    abstract input(value: string);

    abstract getComponent();

    writeValue( value: any ): void {

    }

    registerOnChange( fn: any ): void {
        this.onChange = fn;
    }

    registerOnTouched( fn: any ): void {
        this.onTouched = fn;
    }

    ngOnChanges( changes: SimpleChanges ) {
        if (changes['ngModel'] && changes['ngModel']['currentValue'] !== undefined && !this.loaded) {
            this.loaded = true;
            this.input(changes['ngModel']['currentValue']);
        }

        if (changes['component'] && changes['component']['currentValue'] && !this.detailModeLoaded) {
            this.detailModeLoaded = true;
            this.el.nativeElement.disabled = changes['component']['currentValue']['_detailMode'];
        }

        if (changes['disabled'] && changes['disabled']['currentValue']) {
            this.el.nativeElement.disabled = changes['disabled']['currentValue'];
        }
    }

    dirtyForm() {
        if ( this.getComponent() ) {
            this.helper.dirtyForm(this.getComponent());
        }
    }
}
