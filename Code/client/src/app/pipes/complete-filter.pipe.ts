import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'completeFilter'
})
export class CompleteFilterPipe implements PipeTransform {

    transform(value: any, filterString: string, propName: string): any {
        if (!value || !filterString){
            return value;
        }
        const result = [];
        for (const item of value) {
            if (item[propName].includes(filterString)) {
                result.push(item);
            }
        }
        return result;
    }

}
