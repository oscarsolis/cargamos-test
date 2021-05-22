import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@guards/auth.guard';
import { AppComponent } from '@root/app.component';
import { TasksModule } from '@modules/tasks/tasks.module';
import { WithSessionGuard } from '@guards/with-session.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('@modules/auth/auth.module').then(m => m.AuthModule),
        canLoad: [WithSessionGuard]
      },
      {
        path: 'tasks',
        loadChildren: () => import('@modules/tasks/tasks.module').then(m => TasksModule),
        canLoad: [AuthGuard]
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'tasks'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
