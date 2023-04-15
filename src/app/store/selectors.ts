import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './models';

const getTaskState = createFeatureSelector<TaskState>('taskReducer');

export const getErrorMessage = createSelector(getTaskState, state => state.error);
export const getLoading = createSelector(getTaskState, state => state.loading);
export const getTasks = createSelector(getTaskState, state => state.tasks);
export const getTask = createSelector(getTaskState, state => state.task);
