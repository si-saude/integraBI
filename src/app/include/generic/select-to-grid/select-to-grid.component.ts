import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Helper } from './../../../generic/helper';
import { GenericService } from './../../../generic/generic-service';
import { GenericFilter } from './../../../generic/generic-filter';

@Component({
  selector: 'app-select-to-grid',
  templateUrl: './select-to-grid.component.html',
  styleUrls: ['./select-to-grid.component.css']
})
export class SelectToGridComponent<T, F extends GenericFilter> implements OnInit {

  @Input() component;
  @Input() name: string;
  @Input() service: GenericService<T, F>;
  @Input() filter: F;
  @Input() property: string;

  @Output() response = new EventEmitter();

  private object: T;
  private array: Array<T>;
  private helper: Helper;

  constructor() {
    this.helper = new Helper();
  }

  ngOnInit() {
    this.initializeObject();

    if (!this.component._detailMode) {
      if (this.filter === undefined) {
        this.filter = this.service.initializeFilter();
      }
      this.refresh();
    }
  }

  add() {
    this.response.emit(this.object);
    this.initializeObject();
  }

  initializeObject() {
    this.object = this.service.initializeObject();
  }

  refresh() {
    this.filter.$pageSize = 10000;
    const component = this;
    this.service.list(this.filter, function(res) {
      component.array = component.service.toList(res.json().list);
    }, undefined);
  }
}
