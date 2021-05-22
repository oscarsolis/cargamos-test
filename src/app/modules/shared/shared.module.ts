import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { A11yModule } from '@angular/cdk/a11y';

import { HeaderComponent } from '@modules/shared/components/header/header.component';
import { CounterDownTimerDirective } from './directives/counter-down-timer.directive';
import { TimePipe } from './pipes/time.pipe';
import { WithoutDataComponent } from './components/without-data/without-data.component';
import { InputTimeComponent } from './components/input-time/input-time.component';
import { InputTime } from './components/input-time/input-time.model';

@NgModule({
  declarations: [HeaderComponent, CounterDownTimerDirective, TimePipe, WithoutDataComponent, InputTimeComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    A11yModule,
    MatFormFieldModule
  ],
  exports: [HeaderComponent, CounterDownTimerDirective, TimePipe, WithoutDataComponent, InputTimeComponent],
  entryComponents: [InputTimeComponent, InputTime]
})
export class SharedModule { }
