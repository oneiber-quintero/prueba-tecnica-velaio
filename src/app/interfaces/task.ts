export type TaskFilter = 'all' | 'completed' | 'pending';

export interface Task {
  id: number;
  name: string;
  date: Date;
  completed: boolean;
  userId: number;
}
