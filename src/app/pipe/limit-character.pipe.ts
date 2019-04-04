import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'limitCharacter'})
export class LimitCharacterPipe implements PipeTransform {

    transform(value: string, length: number) {
        if (value && value.length > length) {
            value = value.substring(0, length) + '...';
        }
        return value;
    }
}
