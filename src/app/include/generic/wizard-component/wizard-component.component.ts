import { Component, OnInit, Input } from '@angular/core';

import { GenericWizardComponent } from './../../../generic/generic-wizard-component';

@Component({
  selector: 'app-wizard-component',
  templateUrl: './wizard-component.component.html',
  styleUrls: ['./wizard-component.component.css']
})
export class WizardComponentComponent<T> implements OnInit {

  @Input() component: GenericWizardComponent<T>;

  constructor() { }

  ngOnInit() {
  }

}
