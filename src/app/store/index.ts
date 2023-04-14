import { ActionReducerMap, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Task } from '../models/task';
import { addTask, editTask, getAllTask, removeAllTask, removeTask, setLoading, updateTask } from './actions';

export interface State {}

export interface TaskState {
  loading: boolean;
  tasks: Task[];
  task: Task | null;
}

export interface TaskStoreState {
  taskReducer: TaskState;
}

const initialState: TaskState = {
  loading: false,
  tasks: [],
  task: null,
};

const getTaskState = createFeatureSelector<TaskState>('taskReducer');

export const getLoading = createSelector(getTaskState, state => state.loading);

export const getTasks = createSelector(getTaskState, state => state.tasks);

export const getTask = createSelector(getTaskState, state => state.task);

export const taskReducer = createReducer<TaskState>(
  initialState,
  on(getAllTask, (state, action): TaskState => {
    return {
      ...state,
      tasks: action.tasks,
    };
  }),
  on(addTask, (state, action): TaskState => {
    return {
      ...state,
      tasks: [...state.tasks, action.task],
    };
  }),
  on(editTask, (state, action): TaskState => {
    return {
      ...state,
      task: action.task,
    };
  }),
  on(updateTask, (state, action): TaskState => {
    return {
      ...state,
      task: null,
      tasks: state.tasks.map(i => (i._id === action.task._id ? action.task : i)),
    };
  }),
  on(removeTask, (state, action): TaskState => {
    return {
      ...state,
      tasks: state.tasks.filter(i => i._id !== action.task._id),
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
