import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task';

export const getAllTask = createAction('[Task] Get All Tasks', props<{ tasks: Task[] }>());
export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const editTask = createAction('[Task] Edit Task', props<{ task: Task }>());
export const updateTask = createAction('[Task] Update Task', props<{ task: Task }>());
export const removeTask = createAction('[Task] Remove Task', props<{ task: Task }>());
export const removeAllTask = createAction('[Task] Remove All Tasks');
export const setLoading = createAction('[Task] Set Load', props<{ loading: boolean }>());
