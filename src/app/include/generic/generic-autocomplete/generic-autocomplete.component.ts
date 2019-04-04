import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { Helper } from './../../../generic/helper';
import { GenericService } from './../../../generic/generic-service';
import { GenericFilter } from './../../../generic/generic-filter';

@Component({
  selector: 'app-generic-autocomplete',
  templateUrl: './generic-autocomplete.component.html',
  styleUrls: ['./generic-autocomplete.component.css']
})
export class GenericAutocompleteComponent<T, F extends GenericFilter> implements OnInit {

  @Input() showAdd = false;
  @Input() component;
  @Input() name: string;
  @Input() service: GenericService<T, F>;
  @Input() filter: F;
  @Input() property: string;
  @Input() width = 1;
  @Input() maxLength = 1;
  @Input() object: T;
  @Input() label: string;
  @Input() id = 0;
  @Input() disabled = false;
  @Input() method = 'initializeObject';

  @Output() responseAdd = new EventEmitter();
  @Output() responseChange = new EventEmitter();

  private objectAux: any;
  private lastProperty: string;
  private array: Array<T>;
  private helper: Helper;
  private objectLoaded = false;

  constructor() {
    this.helper = new Helper();
  }

  ngOnInit() {
    if (!this.lastProperty || !this.objectAux || !this.objectAux[this.lastProperty]) {
      this.initializeObject();
    }
    if (!this.component._detailMode) {
      if (this.filter === undefined) {
        this.filter = this.service.initializeFilter();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['object'] && this.helper.isNotNull(changes['object']['currentValue']) && !this.objectLoaded) {
      this.objectLoaded = true;
      this.updateObjectAux();
    }
  }

  add() {
    this.responseAdd.emit(this.object);
    this.initializeObject();
  }

  initializeObject() {
    this.object = this.service[this.method]();
    this.updateObjectAux();
  }

  updateObjectAux() {
    const o = this.helper.getObjectAndProperty(this.object, this.property);
    this.objectAux = o[0];
    this.lastProperty = o[1];
  }

  refresh(event) {
    this.initializeObject();
    const f = this.helper.getObjectAndProperty(this.filter, this.property);
    f[0][f[1]] = event;
    this.objectAux[this.lastProperty] = event;
    this.filter.$pageSize = 6;
    if (this.id > 0) {
      this.filter.$id = this.id;
      this.filter.$idNotEq = true;
    }
    this.service.list(this.filter, (res) => {
      this.array = this.service.toList(res.json().list);
    }, undefined);
  }

  confirm(obj) {
    this.object = obj;
    this.updateObjectAux();
    this.array = new Array<T>();
    this.responseChange.emit(this.object);
  }

  validate() {
    setTimeout( () => {
      if (!this.object['id'] || this.object['id'] === 0) {
        this.initializeObject();
        this.updateObjectAux();
        this.array = new Array<T>();
        this.helper.dirtyForm(this.component);
        this.responseChange.emit(this.object);
      }
    }, 250);
  }
}
