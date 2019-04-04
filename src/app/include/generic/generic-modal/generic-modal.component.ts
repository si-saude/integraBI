import { Component, OnInit, Input } from '@angular/core';

import { IModal } from './../../../generic/imodal';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent implements OnInit {

  @Input() component: IModal;
  @Input() title: string;
  @Input() closeDisabled = false;

  constructor() { }

  ngOnInit() {

  }

  keyDown(event) {
    if (event.key === 'Enter') {
      this.component.confirmModal();
    } else if (event.key === 'Escape' && !this.closeDisabled) {
      this.component.closeModal();
    }
  }
}
