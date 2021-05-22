import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { TaskTime } from '@root/models/task-time.model';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFilterComponent {

  @Output()
  public createTask = new EventEmitter<void>();

  @Output()
  public showHistory = new EventEmitter<void>();

  @Output()
  public filterTask = new EventEmitter<{
    first: number,
    second: number
  }>();

  public readonly taskTimes: Array<any> = [
    {
      id: 0,
      label: 'Seleccione',
      value: {
        first: null,
        second: null
      }
    },
    {
      label: '30 min o menos',
      id: 1,
      value: {
        first: 0,
        second: 30 * 60000
      }
    },
    {
      label: 'de 30 min a 1h',
      id: 2,
      value: {
        first: 30 * 60000,
        second: 60 * 60000
      }
    },
    {
      label: 'mas de 1h',
      id: 3,
      value: {
        first: 60 * 60000,
        second: 120 * 60000
      }
    }
  ];

  public onChangeDuration({ value }: MatSelectChange): void {
    this.filterTask.emit(this.taskTimes.find(({ id }) => id === value).value);
  }
}
