import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models/task';
import { TaskStoreState, getTasks } from 'src/app/store';

@Component({
  selector: 'app-task-empty',
  templateUrl: './task-empty.component.html',
})
export class TaskEmptyComponent {
  tasks: Task[] = [];

  constructor(private store: Store<TaskStoreState>) {
    store.select(getTasks).subscribe(tasks => (this.tasks = tasks));
  }
}
