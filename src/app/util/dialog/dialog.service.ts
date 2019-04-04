import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

    private _message = '';
    private _show = false;

    show(message: string) {
        this._message = message;
        this._show = true;
    }

    hide() {
        this._message = '';
        this._show = false;
    }
}
