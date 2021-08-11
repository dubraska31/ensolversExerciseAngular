import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { TaskService } from '../service/task.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskList: Task[] = [];
  @Input() task: Task = new Task();

  constructor(
    private taskService: TaskService,
    private location: Location
  ) { }

  ngOnInit() {
    this.task = new Task();
    this.getTasks();
  }

  goBack(): void {
    this.location.back();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.taskList = tasks);
  }

  saveTask(): void {
    this.taskService.saveTask(this.task).subscribe(task => { this.taskList.push(task); });

    this.task.taskDescription = '';
    this.task.completed = false;
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe();
  }

  delete(task: Task): void {
    this.taskList = this.taskList.filter(t => t !== task);
    this.taskService.deleteTask(task).subscribe();
  }

}
