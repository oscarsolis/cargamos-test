import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  private SEPATOR = ':';

  transform(time: number): string {
    if (!time || time <= 0) {
      return `00${this.SEPATOR}00${this.SEPATOR}00`;
    }

    let seconds: number | string = Math.floor((time / 1000) % 60);
    let minutes: number | string = Math.floor((time / (1000 * 60)) % 60);
    let hours: number | string = Math.floor((time / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;
    return `${hours}${this.SEPATOR}${minutes}${this.SEPATOR}${seconds}`;
  }

}
