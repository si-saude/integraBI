import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { Helper } from './../../../generic/helper';

@Component({
  selector: 'app-generic-select',
  templateUrl: './generic-select.component.html',
  styleUrls: ['./generic-select.component.css']
})
export class GenericSelectComponent implements OnInit {

  @Input() component;
  @Input() name: string;
  @Input() array: Array<any>;
  @Input() property: string;
  @Input() object;
  @Input() refresh = false;
  @Input() disabled = false;

  @Output() changeValue = new EventEmitter();
  @Output() callRefresh = new EventEmitter();

  private helper: Helper;
  private loaded = false;
  private objectLoaded = false;
  private arrayLoaded = false;

  constructor() {
    this.helper = new Helper();
  }

  ngOnInit() {
  }

  ngOnChanges( changes: SimpleChanges ) {
    if( changes['object'] && changes['object'].currentValue && changes['object'].currentValue.id && !this.objectLoaded ) {
      this.objectLoaded = true;
    }

    if( changes['array'] && changes['array'].currentValue && changes['array'].currentValue.length > 0 && !this.arrayLoaded ) {
      this.arrayLoaded = true;
    }

    if( this.objectLoaded && this.arrayLoaded && !this.loaded) {
      this.loaded = true;
      const c = this;
      setTimeout(() => {
        c.object = c.array.find(a => a['id'] === c.object['id']);
      }, 25);
    }
  }

  dirtyForm() {
    if (this.component.form) {
      this.helper.dirtyForm(this.component);
    }
  }

  change() {
    this.changeValue.emit(this.object);
  }

  doRefresh() {
    if (this.object != undefined) {
      this.dirtyForm();
    }
    this.callRefresh.emit(undefined);
  }
}
