import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task, TaskFilter } from '../../interfaces/task';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  filter = signal<TaskFilter>('all');
  taskService = inject(TaskService);

  constructor() {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  get filteredTasks(): Task[] {
    switch (this.filter()) {
      case 'completed':
        return this.tasks.filter((task) => task.completed);
      case 'pending':
        return this.tasks.filter((task) => !task.completed);
      default:
        return this.tasks;
    }
  }

  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTask(task);
  }

  setFilter(filter: TaskFilter) {
    this.filter.set(filter);
  }
}
