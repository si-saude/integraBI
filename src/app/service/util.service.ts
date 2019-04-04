import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GenericService } from '../generic/generic-service';
import { GenericFilter } from '../generic/generic-filter';
import { Router } from '@angular/router';

import { DialogService } from './../util/dialog/dialog.service';
import { SpinnerService } from './../util/spinner/spinner.service';

@Injectable()
export class UtilService extends GenericService<Object, GenericFilter> {
    constructor(http: Http, router: Router, private dialogService: DialogService,
        private spinnerService: SpinnerService) {
        super(http, 'generic', router, dialogService, spinnerService);
    }

    initializeObject() {
        return new Object();
    }

    initializeFilter() {
        return new GenericFilter();
    }

    toObject(obj: any): Object {
        return this.initializeObject();
    }

    getTypeFilter(filter: string, fThen: any, fCatch: any) {
        this.genericGet('type-filter', filter, fThen, fCatch);
    }

    private genericGet(path: string, filter: string, fThen: any, fCatch: any) {
        this.toPromise(this.http.get(this.rootUrl + this.path + '/' + path + '?filter=' + filter, { headers: this.getHeaders() }  ),
            function (res) {
                if (fThen) {
                    fThen(res.json());
                }
            }, fCatch, undefined);
    }
}
