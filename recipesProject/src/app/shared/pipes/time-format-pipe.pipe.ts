import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormatPipe',
  standalone: true
})
export class TimeFormatPipePipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return '';
    }
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours} שעה${hours > 1 ? 'ות' : ''} ו-${minutes} דקות`;
  }
}
