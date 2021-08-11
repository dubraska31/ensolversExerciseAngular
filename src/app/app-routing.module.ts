import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { FolderComponent } from './folder/folder.component';

const routes: Routes = [
  { path: '', redirectTo: '/folder', pathMatch: 'full' },
  { path: 'folder', component: FolderComponent },
  { path: 'task/:idFolder', component: TaskComponent },
  { path: 'update/:id', component: TaskUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
