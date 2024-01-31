import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kformatter',
  standalone: true,
})
export class KformatterPipe implements PipeTransform {
  transform(num: number, ...args: unknown[]): unknown {
    return Math.abs(num) > 999
      ? Math.sign(num) * parseFloat((Math.abs(num) / 1000).toFixed(1)) + 'k'
      : Math.sign(num) * Math.abs(num);
  }
}
