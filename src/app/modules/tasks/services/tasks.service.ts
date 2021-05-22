import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from '@models/taks.model';
import { TaskStatus } from '@root/enums/task-status.enum';

@Injectable()
export class TasksService {

  private readonly taskCollectionPath: string = '/tasks';
  private readonly tasksCollectionRef: AngularFirestoreCollection<Task>;

  constructor(private readonly firestore: AngularFirestore) {
    this.tasksCollectionRef = this.firestore.collection<Task>(this.taskCollectionPath);
  }

  public createTask(task: Task): Promise<DocumentReference<Task>> {
    return this.tasksCollectionRef.add({ ...task, state: TaskStatus.WAITING });
  }

  public getTaskHistory(): Observable<Array<Task>> {
    return this.firestore
      .collection(this.taskCollectionPath, ref => ref.where('state', '==', 'FINISHED'))
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map(document => this.mapToTask(document)))
      );
  }

  public getTaks(): Observable<Array<Task>> {
    return this.firestore
      .collection(this.taskCollectionPath, ref => ref.where('state', '!=', 'FINISHED'))
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map(document => this.mapToTask(document)))
      );
  }

  public removeTask(taskId: string): Promise<void> {
    return this.tasksCollectionRef.doc(taskId).delete();
  }

  public updateTask(task: Task): Promise<void> {
    return this.tasksCollectionRef.doc(task.id).update(task);
  }

  public startTask(task: Task): Promise<void> {
    return new Promise(() => {
      this.tasksCollectionRef.ref.where('state', '==', 'IN_PROGRESS').get().then(snapshots => {
        if (snapshots.size > 0) {
          snapshots.forEach(orderItem => {
            this.tasksCollectionRef.doc(orderItem.id).update({
              state: TaskStatus.PAUSED
            });
          });
        }
        return this.tasksCollectionRef.doc(task.id).update({
          state: TaskStatus.IN_PROGRESS,
          dateRunning: new Date().getTime()
        });
      });
    });
  }

  private mapToTask(a: DocumentChangeAction<unknown>): Task {
    const id = a.payload.doc.id;
    const data: Task = a.payload.doc.data() as Task;
    return {
      id,
      ...data,
    };
  }
}
