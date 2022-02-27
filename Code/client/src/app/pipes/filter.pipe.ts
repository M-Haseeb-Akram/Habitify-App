import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(value: any, filterString: string, propName: string): any {
        if (!value || !filterString){
            return value;
        }
        const result = [];
        for (const item of value) {
            if (item[propName].startsWith(filterString)) {
                result.push(item);
            }
        }
        return result;
    }

}
