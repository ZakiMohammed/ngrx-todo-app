import { Task } from '../models/task';

export interface State {}

export interface TaskState {
  loading: boolean;
  error: string | null;
  tasks: Task[];
  task: Task | null;
}

export interface TaskStoreState {
  taskReducer: TaskState;
}
