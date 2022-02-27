/* eslint-disable prefer-const */
import { Pipe, PipeTransform } from '@angular/core';
// import { pick } from 'lodash';

@Pipe({
    name: 'datePicker',
    pure: false,
})
export class DatePickerPipe implements PipeTransform {

    transform(value: any[], filterDate: Date): any {
        if (!value || !filterDate){
            return value;
        }
        const result = [];
        let newArr!: any;
        let newProg!: any;
        const localDate =  new Date(filterDate.getTime() - filterDate.getTimezoneOffset() * 60000);
        const selectedDate =localDate.toISOString().slice(0,10);
        for (const item of value) {
            for (const progress of item.progress) {
                let date = new Date(progress.created_date).toISOString().slice(0,10);
                if (date === selectedDate) {
                    newProg = {...progress};
                    newArr = {...item};
                    newArr.progress = newProg;
                    result.push(newArr);
                }
            }
        }
        return result;
    }

}
