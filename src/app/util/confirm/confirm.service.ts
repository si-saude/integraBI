import { Injectable } from '@angular/core';

@Injectable()
export class ConfirmService {

    private _message = '';
    private _show = false;
    private _confirmFunction: any;
    private _confirmObject: any;
    private _cancelFunction: any;
    private _cancelObject: any;

    show(message: string, confirmObj: any, confirmFunc: any, cancelObj: any, cancelFunc: any) {
        this._message = message;
        this._show = true;
        this._confirmFunction = confirmFunc;
        this._confirmObject = confirmObj;
        this._cancelFunction = cancelFunc;
        this._cancelObject = cancelObj;
    }

    hide() {
        if (this._cancelFunction) {
            this._cancelFunction(this._cancelObject);
            this._cancelFunction = undefined;
            this._cancelObject = undefined;
        }
        this._message = '';
        this._show = false;
    }

    confirm() {
        this._confirmFunction(this._confirmObject);
        this.hide();
        this._confirmFunction = undefined;
        this._confirmObject = undefined;
    }
}
