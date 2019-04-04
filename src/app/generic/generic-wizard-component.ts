import { Router, ActivatedRoute } from '@angular/router';

import { GenericComponent } from './generic-component';
import { GenericFilter } from './generic-filter';
import { GenericService } from './generic-service';
import { WizardService } from './../util/wizard-service/wizard-service.service';

export class GenericWizardComponent<T> extends GenericComponent<T> {

    protected first: string;

    constructor(protected service: GenericService<T, GenericFilter>, protected rtr: Router,
        protected rt: ActivatedRoute, protected title: string, protected wizardService: WizardService<T>,
        protected previous: string, protected next: string, protected _submit: string) {
            super(service, rtr, rt, title);
            this.getData();
    }

    getData() {
        if (this.wizardService.getData()) {
            this.t = this.wizardService.getData();
            this.first = this.wizardService.getFirst();
            this.wizardService.clean();
        }
    }

    do(path) {
        this.wizardService.setData(this.t);
        this.wizardService.setFirst(this.first);
        this.navigate(path);
    }

    navigate(path) {
        this.rtr.navigate([path]);
    }

    goFirst() {
        if (this.first) {
            this.navigate(this.first);
        }
    }

    goPrevious() {
        if (this.previous) {
            this.do(this.previous);
        }
    }

    goPreviousIfNullModel(): boolean {
        if (this.helper.isNull(this.t)) {
            this.goPrevious();
            return true;
        }
        return false;
    }

    goNext() {
        if (this.next) {
            this.do(this.next);
        } else {
            this.submit();
        }
    }

    submit() {
        if (this._submit) {
            this.initSave();
            this.service[this._submit](this.t, (res) => {
                if (this.rtr.url.replace('/', '') === this.first) {
                    this.t = this.service.initializeObject();
                    this.clean();
                    this.finishSave();
                } else {
                    this.goFirst();
                }
            }, (error) => {
                this.finishSave();
            });
        }
    }

    clean() {
    
    }
}
