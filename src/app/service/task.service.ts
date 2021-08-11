import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Task } from '../model/task';

@Injectable({ providedIn: 'root'})
export class TaskService {

  private taskUrl = 'http://localhost:8080/tasks';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl)
      .pipe(
        //tap(_ => this.log('fetched heroes')),
        //catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getTaskById(idTask: number): Observable<Task> {
    const url = `${this.taskUrl}/${idTask}`;

    return this.http.get<Task>(url).pipe(
      //tap(_ => this.log(`fetched task id=${idTask}`)),
      //catchError(this.handleError<Task>(`gettask id=${idTask}`))
    );
  }

  saveTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.taskUrl, task, this.httpOptions).pipe();
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.taskUrl, task, this.httpOptions).pipe();
  }

  deleteTask(task: Task | number): Observable<Task> {
    const idTask = typeof task === 'number' ? task : task.idTask;
    const url = `${this.taskUrl}/${idTask}`;

    return this.http.delete<Task>(url, this.httpOptions).pipe();
  }


}
