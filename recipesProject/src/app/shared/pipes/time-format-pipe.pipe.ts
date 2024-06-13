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

    if (hours === 0) {
      return `${minutes} דקות`;
    } else if (minutes === 0) {
      return `${hours} ${hours === 1 ? 'שעה' : 'שעות'}`;
    } else {
      return `${hours} ${hours === 1 ? 'שעה' : 'שעות'} ו-${minutes} דקות`;
    }
  }
}
