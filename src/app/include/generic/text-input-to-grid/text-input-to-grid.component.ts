import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';

import { Helper } from './../../../generic/helper';
import { GenericService } from './../../../generic/generic-service';
import { GenericFilter } from './../../../generic/generic-filter';
import { PhoneFormatDirective } from './../../../directive/phone-format.directive';

@Component({
  selector: 'app-text-input-to-grid',
  templateUrl: './text-input-to-grid.component.html',
  styleUrls: ['./text-input-to-grid.component.css']
})
export class TextInputToGridComponent<T, F extends GenericFilter> implements OnInit {

  @ViewChild(PhoneFormatDirective) phoneFormat: PhoneFormatDirective;

  @Input() showAdd = false;
  @Input() component;
  @Input() name: string;
  @Input() service: GenericService<T, F>;
  @Input() method = 'initializeObject';
  @Input() property: string;
  @Input() width = 1;
  @Input() maxLength = 1;
  @Input() object: T;
  @Input() label: string;
  @Input() disabled = false;
  @Input() directive = '';

  @Output() responseAdd = new EventEmitter();

  private objectAux: any;
  private lastProperty: string;
  private helper: Helper;
  private objectLoaded = false;

  constructor() {
    this.helper = new Helper();
  }

  ngOnInit() {
    this.initializeObject();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['object'] && changes['object']['currentValue'] && !this.objectLoaded) {
      this.objectLoaded = true;
      this.updateObjectAux();
    }
  }

  add() {
    this.responseAdd.emit(this.object);
    this.initializeObject();
  }

  initializeObject() {
    this.object = this.service[this.method]({});
    this.updateObjectAux();
  }

  updateObjectAux() {
    const o = this.helper.getObjectAndProperty(this.object, this.property);
    this.objectAux = o[0];
    this.lastProperty = o[1];

    if (this.phoneFormat) {
      this.phoneFormat.el.nativeElement.value = '';
    }
  }
}
