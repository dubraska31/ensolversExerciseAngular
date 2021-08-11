import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { TaskService } from '../service/task.service';
import { Location } from '@angular/common';

import { Folder } from '../model/folder';
import { FolderService } from '../service/folder.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  folder: Folder = new Folder();
  @Input() task: Task = new Task();

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private folderService: FolderService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getFolderById();
  }

  getFolderById(): void {
    const idFolder = + this.route.snapshot.paramMap.get('idFolder')!;
    this.folderService.getFolderById(idFolder).subscribe(folder => this.folder = folder);
  }

  saveTask(): void {
    this.task.folder.idFolder = + this.route.snapshot.paramMap.get('idFolder')!;
    this.taskService.saveTask(this.task).subscribe(task => { this.folder.task.push(task); });

    this.task.taskDescription = '';
    this.task.completed = false;
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe();
  }

  delete(task: Task): void {
    this.folder.task = this.folder.task.filter(t => t !== task);
    this.taskService.deleteTask(task).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

}
