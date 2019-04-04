import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { IValidator } from './../../../generic/ivalidator';

@Component({
  selector: 'app-generic-form-modal',
  templateUrl: './generic-form-modal.component.html',
  styleUrls: ['./generic-form-modal.component.css']
})
export class GenericFormModalComponent<T> implements OnInit {

  @Input() title: string;
  @Input() service: any;
  @Input() initializeMethod: string;
  @Input() component: any;
  @Input() validator: IValidator<T>;
  @Input() disabled = false;
  @Input() btnConfirm = true;

  @Output() confirm = new EventEmitter();

  private t: T;
  private _show = false;

  constructor() { }

  ngOnInit() {
    this.initializeObject();
  }

  initializeObject() {
    if (!this.initializeMethod) {
      this.initializeMethod = 'initializeObject';
    }

    if (typeof this.service[this.initializeMethod] === 'function') {
      this.t = this.service[this.initializeMethod]();
    }
  }

  open() {
    this._show = true;
    this.initializeObject();
  }

  openObject(obj: T) {
    this._show = true;
    this.t = obj;
  }

  close() {
    this._show = false;
  }

  confirmAndClose() {
    if (this.validator.validate(this.t)) {
      this.confirm.emit(this.t);
      this.close();
    }
  }
}
