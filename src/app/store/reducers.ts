import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { initialState } from './initial';
import { TaskState } from './models';

export const taskReducer = createReducer<TaskState>(
  initialState,
  on(actions.getAllTask, (state, action): TaskState => {
    return {
      ...state,
      tasks: action.tasks,
    };
  }),
  on(actions.addTask, (state, action): TaskState => {
    return {
      ...state,
      tasks: [...state.tasks, action.task],
    };
  }),
  on(actions.editTask, (state, action): TaskState => {
    return {
      ...state,
      task: action.task,
    };
  }),
  on(actions.updateTask, (state, action): TaskState => {
    return {
      ...state,
      task: null,
      tasks: state.tasks.map(i => (i._id === action.task._id ? action.task : i)),
    };
  }),
  on(actions.removeTask, (state, action): TaskState => {
    return {
      ...state,
      tasks: state.tasks.filter(i => i._id !== action.task._id),
    };
  }),
  on(actions.removeAllTask, (state): TaskState => {
    return {
      ...state,
      tasks: [],
    };
  }),
  on(actions.setLoading, (state, action): TaskState => {
    return {
      ...state,
      loading: action.loading,
    };
  }),
  on(actions.setError, (state, action): TaskState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
