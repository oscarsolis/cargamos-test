import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { Task } from '@root/models/taks.model';
import { TaskStatus } from '@root/enums/task-status.enum';
import { TasksService } from '@modules/tasks/services/tasks.service';
import { NotificationService } from '@services/notification.service';
import { TaskCreateComponent } from '@modules/tasks/components/task-create/task-create.component';
import { TaskHistoryComponent } from '@modules/tasks/components/task-history/task-history.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnDestroy {

  public tasks: Array<Task> = [];
  public readonly tableColumns: Array<string> = [
    'description',
    'duration',
    'time_remaining',
    'controls',
    'status',
    'time_to_finish',
    'options'
  ];
  private subscription: Subscription = new Subscription();

  constructor(
    public readonly dialog: MatDialog,
    private readonly tasksService: TasksService,
    private readonly notificationService: NotificationService
  ) {
    this.subscription = this.tasksService
    .getTaks()
    .subscribe((tasks: Array<Task>) => this.tasks = tasks);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onCreateOrUpdateTask(task: Task = null): void {
    this.dialog.open(TaskCreateComponent, {
      disableClose: true,
      width: '500px',
      data: task
    });
  }

  public onDeleteTask(task: Task): void {
    this.tasksService
      .removeTask(task.id)
      .then(() => this.notificationService.success('Registro eliminado correctamente'))
      .catch(() => this.notificationService.error('Ups! Algo salio mal'));
  }

  public trackTask(task: Task): string {
    return task.id;
  }

  public onClickStartTask(task: Task): void {
    this.tasksService.startTask({
      ...task
    });
  }

  public onClickPauseTask(task: Task): void {
    const currentDate = new Date().getTime();
    const dateRuning = new Date(task.dateRunning).getTime();
    this.tasksService.updateTask({
      ...task,
      state: TaskStatus.PAUSED,
      timeRemaing: task.duration - (currentDate - dateRuning),
      dateRunning: null
    });
  }

  public onClickFinishTask(task: Task, time: number): void {
    const timeUsed: number = task.state === TaskStatus.IN_PROGRESS
      ? (time ? time : task.duration - task.timeRemaing)
      : task.duration;
    this.tasksService.updateTask({
      ...task,
      timeUsed,
      state: TaskStatus.FINISHED,
      dateRunning: null,
    });
  }

  public onShowHistory(): void {
    this.dialog.open(TaskHistoryComponent, {
      panelClass: 'full-screen-modal'
    });
  }

  public onChange(time: number, task: Task): void {
    this.tasksService.updateTask({
      ...task,
      timeRemaing: time
    });
  }

}
