import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {
    compareObjects = (object1:any, object2:any, key:string) => {
        const obj1 = object1[key].toUpperCase()
        const obj2 = object2[key].toUpperCase()

        if (obj1 < obj2) {
            return -1
        }
        if (obj1 > obj2) {
            return 1
        }
        return 0
    }

    transform(value: any, sortingIndex: string): any {
        if (!value || !sortingIndex){
            return value;
        }
        let result = [];
        if (sortingIndex === 'my-habits') {
            result = value.reverse();
        }
        if (sortingIndex === 'ascending') {
            result = value.sort((obj1:any, obj2:any) => {
                return this.compareObjects(obj1, obj2, 'Name');
            });
        }
        if (sortingIndex === 'descending') {
            result = value.sort((obj1:any, obj2:any) => {
                return this.compareObjects(obj1, obj2, 'Name');
            });
            result = result.reverse();
        }
        return result;
    }

}
