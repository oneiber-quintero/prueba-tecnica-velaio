import { Person } from './Person';
export type TaskFilter = 'all' | 'completed' | 'pending';

export interface Task {
  id: number;
  userId: number;
  name: string;
  date: Date;
  completed: boolean;
  people: Person[];
}
