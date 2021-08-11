import { Folder } from "./folder";

export class Task {
  idTask: number = 0;
  taskDescription: string = '';
  completed: boolean = false;
  folder: Folder = new Folder();
 }
