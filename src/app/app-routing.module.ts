import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { TaskComponent } from './task/task.component';
import { TaskUpdateComponent } from './task-update/task-update.component';



const routes: Routes = [
  { path: '', redirectTo: '/task', pathMatch: 'full' },
  { path: 'task', component: TaskComponent },
  { path: 'update/:id', component: TaskUpdateComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}