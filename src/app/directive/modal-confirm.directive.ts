import { Directive, HostListener, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive( {
    selector: '[modalConfirm]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: ModalConfirmDirective,
        multi: true
    }]
} )

export class ModalConfirmDirective implements ControlValueAccessor {
    onChange: any;
    onTouched: any;

    @Output() changeValue = new EventEmitter();


    constructor( private el: ElementRef ) {

    }

    ngOnInit() {

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
        this.changeValue.emit($event.target.value);
    }
}