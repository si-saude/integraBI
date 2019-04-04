import {Pipe, PipeTransform} from '@angular/core';

import { Helper } from './../generic/helper';

@Pipe({name: 'gridFilter'})
export class GridFilterPipe implements PipeTransform {

    private helper: Helper;

    constructor() {
        this.helper = new Helper();
    }

    transform(array: any[], filter, component) {
        array = array ? array.filter(a => {
            let index = 0;
            for (let key of Object.keys(filter)) {
                if (filter[key] !== undefined && filter[key] !== null && filter[key] !== '') {
                    if (!a[index][0][a[index][1]].toString().toLowerCase().includes(filter[key].toString().toLowerCase())) {
                        return false;
                    }
                }
                index++;
            }
            return true;
        }) : array;
        component.filterArray = array;
        return array;
    }
}
