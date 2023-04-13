import { ActionReducerMap, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Task } from '../models/task';
import { addTask, removeAllTask, removeTask, setLoading, updateTask } from './actions';

export interface State {}

export interface TaskState {
  loading: boolean;
  tasks: Task[];
  task: Task | null;
}

const initialState: TaskState = {
  loading: false,
  tasks: [],
  task: null,
};

const getTaskState = createFeatureSelector<TaskState>('tasks');

export const getLoading = createSelector(getTaskState, state => state.loading);

export const getTasks = createSelector(getTaskState, state => state.tasks);

export const getTask = createSelector(getTaskState, state => state.task);

export const taskReducer = createReducer<TaskState>(
  initialState,
  on(addTask, (state, action): TaskState => {
    return {
      ...state,
      tasks: [...state.tasks, action.task],
    };
  }),
  on(updateTask, (state, action): TaskState => {
    const index = state.tasks.findIndex(i => i._id === action.task._id);
    state.tasks[index] = action.task;
    return {
      ...state,
      task: null,
    };
  }),
  on(removeTask, (state, action): TaskState => {
    const index = state.tasks.findIndex(i => i._id === action.task._id);
    state.tasks.splice(index, 1);
    return {
      ...state,
    };
  }),
  on(removeAllTask, (state): TaskState => {
    return {
      ...state,
      tasks: [],
    };
  }),
  on(setLoading, (state, action): TaskState => {
    return {
      ...state,
      loading: action.loading,
    };
  })
);

export const reducers: ActionReducerMap<State> = {
  taskReducer,
};
