import { Directive, HostListener, EventEmitter, Output, ElementRef, SimpleChanges, OnChanges, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { GenericFormatDirective } from './../generic/generic-format-directive';

@Directive( {
    selector: '[dateTimeFormat]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: DateTimeFormatDirective,
        multi: true
    }]
} )

export class DateTimeFormatDirective extends GenericFormatDirective implements ControlValueAccessor, OnChanges {

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
        value = value.replace(/\D/g, '')
            .replace(/^(\d{2})(\d{2})?(\d{4})?(\d{2})?(\d{2})?/, '$1/$2/$3 $4:$5');
        const c = this;
        setTimeout(function() {
            c.el.nativeElement.value = value;
            c.changeValue.emit( value );
        }, 25);
    }

    @HostListener( 'keydown', ['$event'] )
    onKeydown( $event: any ) {
        if ($event.key === 'Backspace') {
            $event.target.value = '';
            this.changeValue.emit( '' );
            this.dirtyForm();
        }
    }

    @HostListener( 'blur', ['$event'] )
    onBlur( $event: any ) {
        const value = $event.target.value;
        if (value && value.length === 16) {
            if (this.helper.validateDateTime($event.target.value)) {
                return;
            }
        }
        $event.target.value = '';
        this.changeValue.emit( '' );
    }
}
