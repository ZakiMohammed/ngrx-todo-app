import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models/task';
import { TaskState } from 'src/app/store';

@Component({
  selector: 'app-task-empty',
  templateUrl: './task-empty.component.html',
})
export class TaskEmptyComponent {
  tasks: Task[] = [];

  constructor(private store: Store<{ taskReducer: TaskState }>) {
    store.select('taskReducer').subscribe(state => (this.tasks = state.tasks));
  }
}
