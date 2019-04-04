import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DateFilter } from './../../../generic/date-filter';

import { UtilService } from './../../../service/util.service';

@Component({
  selector: 'app-generic-date-filter',
  templateUrl: './generic-date-filter.component.html',
  styleUrls: ['./generic-date-filter.component.css']
})
export class GenericDateFilterComponent implements OnInit {

  @Input() dateFilter: DateFilter;
  @Input() property: string;
  @Input() label: string;
  @Input() defaultType = false;

  @Output() changeValue = new EventEmitter();

  private types: Array<string>;

  constructor(private utilService: UtilService) {

  }

  ngOnInit() {
    const component = this;
    this.utilService.getTypeFilter('', function(list) {
      component.types = list;
    }, undefined);
  }
}
