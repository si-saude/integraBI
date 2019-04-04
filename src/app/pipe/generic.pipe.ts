import {Pipe, PipeTransform} from '@angular/core';

import { Helper } from './../generic/helper';

@Pipe({name: 'genericPipe'})
export class GenericPipe implements PipeTransform {

    transform(value: string, type: string) {
        if (type && type.toString().trim().length > 0) {
            switch (type) {
                case 'phone':
                    value = Helper.toPhoneFormat(value);
                break;
                case 'dateTime':
                    if (value) {
                        const time = value.split(' ');
                        if (time[1] && time[1] === '00:00') {
                            value = time[0];
                        }
                    }
                break;
                case 'date':
                    if (value) {
                        const time = value.split(' ');
                        value = time[0];
                    }
                break;
                case 'time':
                    if (value) {
                        const time = value.split(' ');
                        value = time[1];
                    }
                break;
            }
        }
        return value;
    }
}
