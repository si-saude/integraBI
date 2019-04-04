import { Directive, HostListener, EventEmitter, Output, ElementRef, SimpleChanges, OnChanges, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Helper } from './../generic/helper';

@Directive( {
    selector: '[integerFormat]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: IntegerFormatDirective,
        multi: true
    }]
} )

export class IntegerFormatDirective implements ControlValueAccessor, OnChanges {
    private helper: Helper;
    private loaded = false;
    private detailModeLoaded = false;
    onChange: any;
    onTouched: any;

    @Input() ngModel;
    @Input() component;
    @Input() disabled = false;
    @Output() changeValue = new EventEmitter();

    constructor( private el: ElementRef ) {
        this.helper = new Helper();
    }

    ngOnInit() {

    }

    ngOnChanges( changes: SimpleChanges ) {
        if (changes['ngModel'] && changes['ngModel']['currentValue'] !== undefined && !this.loaded) {
            this.loaded = true;
            this.input(changes['ngModel']['currentValue']);
            this.el.nativeElement.value = changes['ngModel']['currentValue'];
        }

        if (changes['component'] && changes['component']['currentValue'] && !this.detailModeLoaded) {
            this.detailModeLoaded = true;
            this.el.nativeElement.disabled = changes['component']['currentValue']['_detailMode'];
        }

        if (changes['disabled'] && changes['disabled']['currentValue']) {
            this.el.nativeElement.disabled = this.disabled;
        }
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
        if ( $event.target.value ) {
            this.input($event.target.value);
            this.dirtyForm();
        }
    }

    dirtyForm() {
        if ( this.component ) {
            this.helper.dirtyForm(this.component);
        }
    }

    input(value) {
        if (value !== undefined) {
            const negative = value.toString().includes('-') ? true : false;

            value = value.toString().replace( /\D/g, '' );

            if (negative) {
                value = '-' + value;
            }

            setTimeout(() => {
                this.el.nativeElement.value = value;
                this.changeValue.emit(value);
            }, 25);
        }
    }

    @HostListener( 'blur', ['$event'] )
    onBlur( $event: any ) {
        const value = $event.target.value;
        if (value === '-') {
            $event.target.value = '';
            this.changeValue.emit( '' );
        }
    }
}
