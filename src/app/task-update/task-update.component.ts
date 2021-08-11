import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../model/task';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {
  @Input() task: Task = new Task();

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    const id = + this.route.snapshot.paramMap.get('id')!;
    this.taskService.getTaskById(id).subscribe(task => this.task = task);
  }

  goBack(): void {
    this.location.back();
  }

  updateTask(): void {
    this.taskService.updateTask(this.task).subscribe(() => this.goBack());
  }

}
