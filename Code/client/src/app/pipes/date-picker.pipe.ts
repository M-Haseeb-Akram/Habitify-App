/* eslint-disable prefer-const */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'datePicker'
})
export class DatePickerPipe implements PipeTransform {

    transform(value: any, filterDate: Date, propName: string): any {
        if (!value || !filterDate){
            return value;
        }
        const result = [];
        for (const item of value) {
            let localDate =  new Date(filterDate.getTime() - filterDate.getTimezoneOffset() * 60000);
            let date = new Date(item[propName]).toISOString().slice(0,10);
            let selectedDate =localDate.toISOString().slice(0,10);
            if (date === selectedDate) {
                result.push(item);
            }
        }
        return result;
    }

}
