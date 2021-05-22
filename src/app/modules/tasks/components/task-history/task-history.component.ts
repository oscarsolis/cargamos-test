import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Task } from '@models/taks.model';
import { TasksService } from '@modules/tasks/services/tasks.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.scss']
})
export class TaskHistoryComponent implements OnDestroy {

  public tasks: Array<Task> = [];
  public readonly tableColumns: Array<string> = [
    'description',
    'duration',
    'time_to_finish',
  ];

  private subscription: Subscription = new Subscription();

  constructor(private readonly taskService: TasksService) {
    this.subscription = this.taskService
      .getTaskHistory()
      .subscribe((tasks: Array<Task>) => this.tasks = tasks);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
