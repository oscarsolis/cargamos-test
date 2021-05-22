import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Directive({
  selector: '[appCounterDownTimer]'
})
export class CounterDownTimerDirective implements OnInit, OnDestroy, OnChanges {

  @Input()
  time = 0;

  @Input()
  start = true;

  @Output()
  timeRemaing: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  taskFinished: EventEmitter<number> = new EventEmitter<number>();

  private currentTime = 0;
  private readonly DELIM = ':';
  private subscription: Subscription = new Subscription();

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.currentTime = this.time;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.time) {
      this.currentTime = this.time || 0;
    }
    this.elementRef.nativeElement.innerText = this.getTime();
    if (this.currentTime <= 0 || !this.start) {
      return this.subscription.unsubscribe();
    }
    this.subscription = interval(1000).subscribe(() => {
      this.elementRef.nativeElement.innerText = this.getTime();
      this.currentTime -= 1000;
      if (this.currentTime === 0) {
        this.taskFinished.emit(this.currentTime);
        this.subscription.unsubscribe();
      }
    });
  }

  private getTime(): string {
    let seconds: number | string = Math.floor((this.currentTime / 1000) % 60);
    let minutes: number | string = Math.floor((this.currentTime / (1000 * 60)) % 60);
    let hours: number | string = Math.floor((this.currentTime / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    return `${hours}${this.DELIM}${minutes}${this.DELIM}${seconds}`;
  }

}
