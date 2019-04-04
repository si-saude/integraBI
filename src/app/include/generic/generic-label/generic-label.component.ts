import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-generic-label',
  templateUrl: './generic-label.component.html',
  styleUrls: ['./generic-label.component.css']
})
export class GenericLabelComponent implements OnInit {

  @Input() width: string;

  constructor() { }

  ngOnInit() {
  }

}
