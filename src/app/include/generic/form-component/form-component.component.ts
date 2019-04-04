import { Component, OnInit, Input } from '@angular/core';

import { GenericComponent } from './../../../generic/generic-component';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent<T> implements OnInit {

  @Input() component: GenericComponent<T>;

  constructor() { }

  ngOnInit() {
  }

}
