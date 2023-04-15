import { ActionReducerMap } from '@ngrx/store';
import { State } from './models';
import { taskReducer } from './reducers';

export const reducers: ActionReducerMap<State> = {
  taskReducer,
};
