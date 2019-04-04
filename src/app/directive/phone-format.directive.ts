import { Directive, HostListener, EventEmitter, Output, ElementRef, SimpleChanges, OnChanges, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { GenericFormatDirective } from './../generic/generic-format-directive';

@Directive( {
    selector: '[phoneFormat]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: PhoneFormatDirective,
        multi: true
    }]
} )

export class PhoneFormatDirective extends GenericFormatDirective implements ControlValueAccessor, OnChanges {

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
        value = this.helper.toPhoneFormat(value);
        setTimeout(() => {
            this.el.nativeElement.value = value;
            this.changeValue.emit( value.replace(/\D/g, '') );
        }, 25);
    }

    @HostListener( 'blur', ['$event'] )
    onBlur( $event: any ) {
        const value = $event.target.value;
        if (value && value.toString().replace(/\D/g, '').length >= 10) {
            return;
        }
        $event.target.value = '';
        this.changeValue.emit( '' );
    }
}
