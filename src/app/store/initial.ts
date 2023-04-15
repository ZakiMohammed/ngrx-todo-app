import { TaskState } from './models';

export const initialState: TaskState = {
  loading: false,
  error: null,
  tasks: [],
  task: null,
};
