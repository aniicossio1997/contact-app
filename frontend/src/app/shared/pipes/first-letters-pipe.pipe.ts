import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetters'
})
export class FirstLettersPipePipe implements PipeTransform {
  transform(value1: string | undefined, value2: string |undefined): string {
    if (!value1 && !value2) {
      return '';
    }
    const firstLetter1 = value1 ? value1[0] : '';
    const firstLetter2 = value2 ? value2[0] : '';
    return firstLetter1.toUpperCase() + firstLetter2.toUpperCase();
  }
}
