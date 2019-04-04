import { Component, OnInit } from '@angular/core';

import { DialogService } from './util/dialog/dialog.service';
import { ConfirmService } from './util/confirm/confirm.service';
import { SpinnerService } from './util/spinner/spinner.service';

import { appRoutes } from './router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dialogService: DialogService, private spinnerService: SpinnerService,
    private confirmService: ConfirmService) {

  }
}
