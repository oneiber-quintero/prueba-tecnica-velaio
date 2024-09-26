import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, name: 'Tarea 1', date: new Date(), completed: false, userId: 1 },
    { id: 2, name: 'Tarea 2', date: new Date(), completed: true, userId: 2 },
    { id: 1, name: 'Tarea 1', date: new Date(), completed: false, userId: 1 },
    { id: 2, name: 'Tarea 2', date: new Date(), completed: true, userId: 2 },
    // { id: 1, name: 'Tarea 1', date: new Date(), completed: false, userId: 1 },
    // { id: 2, name: 'Tarea 2', date: new Date(), completed: true, userId: 2 },
    // { id: 1, name: 'Tarea 1', date: new Date(), completed: false, userId: 1 },
    // { id: 2, name: 'Tarea 2', date: new Date(), completed: true, userId: 2 },
    // { id: 1, name: 'Tarea 1', date: new Date(), completed: false, userId: 1 },
    // { id: 2, name: 'Tarea 2', date: new Date(), completed: true, userId: 2 },
    // { id: 1, name: 'Tarea 1', date: new Date(), completed: false, userId: 1 },
    // { id: 2, name: 'Tarea 2', date: new Date(), completed: true, userId: 2 },
    // { id: 1, name: 'Tarea 1', date: new Date(), completed: false, userId: 1 },
    // { id: 2, name: 'Tarea 2', date: new Date(), completed: true, userId: 2 },
    // { id: 1, name: 'Tarea 1', date: new Date(), completed: false, userId: 1 },
    // { id: 2, name: 'Tarea 2', date: new Date(), completed: true, userId: 2 },

  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  updateTask(task: Task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
  }
}
