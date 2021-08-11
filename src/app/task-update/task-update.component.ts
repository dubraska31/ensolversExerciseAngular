import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../model/task';
import { TaskService } from '../service/task.service';

import { Folder } from '../model/folder';
import { FolderService } from '../service/folder.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {
  folder: Folder = new Folder();
  @Input() task: Task = new Task();

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private folderService: FolderService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getTask();
    this.getFolderById();
  }

  getFolderById(): void {
    const idFolder = + this.route.snapshot.paramMap.get('idFolder')!;
    this.folderService.getFolderById(idFolder).subscribe(folder => this.folder = folder);
  }

  getTask(): void {
    const id = + this.route.snapshot.paramMap.get('idTask')!;
    this.taskService.getTaskById(id).subscribe(task => this.task = task);
  }

  goBack(): void {
    this.location.back();
  }

  updateTask(): void {
    this.task.folder = this.folder;
    this.taskService.updateTask(this.task).subscribe(() => this.goBack());
  }

}
