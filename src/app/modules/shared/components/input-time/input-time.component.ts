import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, OnDestroy, Input, ViewChild, ElementRef, Optional, Inject, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MAT_FORM_FIELD } from '@angular/material/form-field';
import { Subject, Subscription } from 'rxjs';

import { InputTime } from './input-time.model';

@Component({
  selector: 'app-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: InputTimeComponent }],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  }
})
export class InputTimeComponent implements ControlValueAccessor, MatFormFieldControl<InputTime>, OnDestroy {
  static nextId = 0;
  @ViewChild('hours') hoursInput: HTMLInputElement;
  @ViewChild('minutes') minutesInput: HTMLInputElement;
  // @ViewChild('subscriber') subscriberInput: HTMLInputElement;

  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  // tslint:disable-next-line: variable-name
  private _required = false;

  // tslint:disable-next-line: variable-name
  private _placeholder: string;

  // tslint:disable-next-line: variable-name
  private _disabled = false;

  private subscription: Subscription = new Subscription();

  controlType = 'example-tel-input';
  id = `input-${InputTimeComponent.nextId++}`;
  onChange = (_: any) => { };
  onTouched = () => { };


  static ngAcceptInputType_disabled: BooleanInput;
  // tslint:disable-next-line: member-ordering

  static ngAcceptInputType_required: BooleanInput;

  get empty(): boolean {
    const {
      value: { hours, minutes }
    } = this.parts;

    return !minutes && !hours;
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  @Input('aria-describedby') userAriaDescribedBy = '';

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }

  @Input()
  get value(): InputTime | null {
    if (this.parts.valid) {
      const {
        value: { hours, minutes }
      } = this.parts;
      return new InputTime(hours, minutes);
    }
    return null;
  }

  set value(tel: InputTime | null) {
    const { hours, minutes } = tel || new InputTime('', '');
    this.parts.setValue({ hours, minutes });
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.get('minutes').invalid && this.parts.get('hours').invalid;
  }

  constructor(
    formBuilder: FormBuilder,
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl
  ) {
    this.parts = formBuilder.group({
      hours: [
        null,
        [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.max(2)]
      ],
      minutes: [
        null,
        [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.max(59)]
      ]
    });

    this.subscription = this.parts.valueChanges.subscribe(value => {
      const { hours } = value;
      if (Number(hours) >= 2) {
        this.parts.get('minutes').setValidators(
          [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.max(0)]
        );
      } else {
        this.parts.get('minutes').setValidators(
          [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.max(59)]
        );
      }
    });

    focusMonitor.monitor(elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    if (!control.errors && nextElement) {
      this.focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this.focusMonitor.focusVia(prevElement, 'program');
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.subscription.unsubscribe();
    this.focusMonitor.stopMonitoring(this.elementRef);
  }

  setDescribedByIds(ids: string[]): void {
    // tslint:disable-next-line: no-non-null-assertion
    const controlElement = this.elementRef.nativeElement.querySelector('.input-container')!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick(): void {
    if (this.parts.controls.minutes.valid) {
      this.focusMonitor.focusVia(this.hoursInput, 'program');
    } else if (this.parts.controls.minutes.valid) {
      this.focusMonitor.focusVia(this.minutesInput, 'program');
    } else {
      this.focusMonitor.focusVia(this.hoursInput, 'program');
    }
  }

  writeValue(tel: InputTime | null): void {
    this.value = tel;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }

}
