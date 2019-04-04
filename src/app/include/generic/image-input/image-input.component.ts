import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Helper } from './../../../generic/helper';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
export class ImageInputComponent implements OnInit {

  private helper: Helper;

  @Input() img: string;
  @Input() name: string;
  @Input() accept: string;
  @Input() component;

  @Output() changeImg = new EventEmitter();

  constructor() {
    this.helper = new Helper();
  }

  ngOnInit() {
  }

  change(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.changeImg.emit(reader.result.toString());
        this.dirtyForm();
      };
      reader.readAsDataURL(file);
    }
  }

  dirtyForm() {
    this.helper.dirtyForm(this.component);
  }
}
