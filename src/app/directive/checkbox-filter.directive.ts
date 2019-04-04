import { Directive, HostListener, EventEmitter, Output, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Helper } from './../generic/helper';

@Directive( {
    selector: '[checkboxFilter]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: CheckboxFilterDirective,
        multi: true
    }]
} )

export class CheckboxFilterDirective implements ControlValueAccessor {
    onChange: any;
    onTouched: any;

    @Input() value: number;
    @Output() changeValue = new EventEmitter();

    constructor( private el: ElementRef ) {
        this.el.nativeElement.indeterminate = true;
        this.el.nativeElement.checked = true;
        this.value = 0;
    }

    writeValue( value: any ): void {

    }

    registerOnChange( fn: any ): void {
        this.onChange = fn;
    }

    registerOnTouched( fn: any ): void {
        this.onTouched = fn;
    }

    @HostListener( 'input', ['$event'] )
    onInput( $event: any ) {
        let valor = this.value;

        if (<any>valor === false) {
            valor = 1;
        } else if (<any>valor === true) {
            valor = 2;
        } else if (valor === undefined) {
            valor = 0;
        }

        if (valor === 2) {
            this.el.nativeElement.indeterminate = true;
            this.el.nativeElement.checked = true;
            valor = 0;
        } else {
            valor++;
        }
        this.changeValue.emit(valor);
    }
}
