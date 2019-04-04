import { Injectable } from '@angular/core';

@Injectable()
export class WizardService<T> {

    private data: T;
    private first: string;

    getData() {
        return this.data;
    }

    setData(value: T) {
        this.data = value;
    }

    getFirst() {
        return this.first;
    }

    setFirst(value: string) {
        this.first = value;
    }

    clean() {
        this.data = undefined;
        this.first = undefined;
    }
}
