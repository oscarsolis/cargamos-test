import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentReference } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

import { Task } from '@models/taks.model';
import { TaskTime } from '@root/models/task-time.model';
import { InputTime } from '@modules/shared/components/input-time/input-time.model';
import { TasksService } from '@modules/tasks/services/tasks.service';
import { NotificationService } from '@root/services/notification.service';
import { TASK_TIMES } from '@modules/tasks/constants/task-times.constants';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {

  public taskForm: FormGroup;
  public showLoading = false;
  public readonly taskTimes: Array<TaskTime> = TASK_TIMES;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly tasksService: TasksService,
    private readonly notificationService: NotificationService,
    public readonly dialogRef: MatDialogRef<TaskCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: Task
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  public onSubmit(): void {
    if (this.taskForm.valid) {
      this.createOrUpdateTask();
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  private createOrUpdateTask(): void {
    this.showLoading = true;
    const value: Task = this.mapPayload();
    const request: Promise<void | DocumentReference<Task>> = this.data
      ? this.tasksService.updateTask(value)
      : this.tasksService.createTask(value);
    request
      .then(() => this.onSuccess())
      .catch(() => this.onFailed());
  }

  private createForm(): void {
    this.taskForm = this.formBuilder.group({
      description: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      // customTime: new FormControl(new InputTime('', ''), Validators.required)
    });

    if (this.data) {
      this.taskForm.addControl('id', new FormControl(this.data.id, Validators.required));
      this.taskForm.patchValue(this.data);
    }
  }

  private onSuccess(): void {
    this.dialogRef.close(true);
    this.showLoading = false;
    this.notificationService.success('Registro guardado correctamente');
  }

  private onFailed(): void {
    this.showLoading = false;
    this.notificationService.error('Ups! algo salio mal');
  }

  public onChangeDuration({ value }: MatSelectChange): void {
    if (value === 0 || value) {
      this.taskForm.addControl('customTime', new FormControl(new InputTime('', ''), [Validators.required]));
    } else {
      this.taskForm.removeControl('customTime');
    }
    this.taskForm.updateValueAndValidity();
  }

  private mapPayload(): Task {
    const {
      description,
      duration,
      customTime,
      id
    } = this.taskForm.value;
    const payload: Task = {
      description,
      duration,
      timeRemaing: duration
    };
    if (duration === 0) {
      const time: InputTime = customTime;
      const hoursToMiliseconds: number = (Number(time.hours) * 60) * 60000;
      const minutesToMiliseconds: number = (Number(time.minutes) * 60000);
      payload.duration = hoursToMiliseconds + minutesToMiliseconds;
      payload.timeRemaing = hoursToMiliseconds + minutesToMiliseconds;
    }
    if (id) {
      payload.id = id;
    }
    return payload;
  }
}
