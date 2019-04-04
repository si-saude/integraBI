import { Directive, HostListener, EventEmitter, Output, ElementRef, SimpleChanges, OnChanges, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { GenericFormatDirective } from './../generic/generic-format-directive';

@Directive( {
    selector: '[cepFormat]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: CepFormatDirective,
        multi: true
    }]
} )

export class CepFormatDirective extends GenericFormatDirective implements ControlValueAccessor, OnChanges {

    @Input() ngModel;
    @Input() component;
    @Input() disabled = false;
    @Output() changeValue = new EventEmitter();

    constructor(el: ElementRef ) {
        super(el);
    }

    ngOnInit() {

    }

    @HostListener( 'input', ['$event'] )
    onInput( $event: any ) {
        if ( $event.target.value ) {
            this.input($event.target.value);
            this.dirtyForm();
        }
    }

    getComponent() {
        return this.component;
    }

    input(value) {
        if (value.length > 9) {
            value = value.substring(0, 9);
        }
        value = value.replace(/\D/g, '')
            .replace(/^(\d{5})?(\d{3})?/, '$1-$2');
        setTimeout(() => {
            this.el.nativeElement.value = value;
            this.changeValue.emit( value.replace(/\D/g, '') );
        }, 25);
    }

    @HostListener( 'blur', ['$event'] )
    onBlur( $event: any ) {
        const value = $event.target.value;
        if (value && value.length === 9) {
            return;
        }
        $event.target.value = '';
        this.changeValue.emit( '' );
    }
}
