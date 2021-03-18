import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, input: string): any {
    if (input) {
      input = input.toLowerCase();
      return value.filter(val => val.gameName.toString().toLowerCase().indexOf(input) >= 0);
    } else {
      return value;
    }
  }

}
