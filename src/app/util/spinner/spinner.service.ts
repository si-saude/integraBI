import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {

    private _show = false;

    show() {
        this._show = true;
    }

    hide() {
        this._show = false;
    }
}
