import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/Icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material/tabs';

import { TasksService } from '@modules/tasks/services/tasks.service';
import { TasksRoutingModule } from '@modules/tasks/tasks-routing.module';
import { SharedModule } from '@modules/shared/shared.module';
import { TaskListComponent } from '@modules/tasks/components/task-list/task-list.component';
import { TaskCreateComponent } from '@modules/tasks/components/task-create/task-create.component';
import { TaskFilterComponent } from '@modules/tasks/components/task-filter/task-filter.component';
import { TaskHistoryComponent } from './components/task-history/task-history.component';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskCreateComponent,
    TaskFilterComponent,
    TaskHistoryComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatMenuModule,
    MatSelectModule,
    DragDropModule,
    MatTabsModule,
    SharedModule
  ],
  providers: [TasksService],
  entryComponents: [TaskCreateComponent]
})
export class TasksModule { }
