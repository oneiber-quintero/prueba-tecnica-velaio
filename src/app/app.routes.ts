import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/tasks/tasks.component').then(m => m.TasksComponent)
  },
  {
    path: 'new-task',
    loadComponent: () => import('./pages/new-task/new-task.component').then(m => m.NewTaskComponent)
  }
];
