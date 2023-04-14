import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, catchError, of, finalize } from 'rxjs';
import { TaskHttpService } from 'src/app/http/task.http.service';
import { Task } from 'src/app/models/task';
import { TaskStoreState, getTasks } from 'src/app/store';
import { removeAllTask, setLoading } from 'src/app/store/actions';

@Component({
  selector: 'app-task-clear',
  templateUrl: './task-clear.component.html',
})
export class TaskClearComponent {
  tasks: Task[] = [];

  constructor(private store: Store<TaskStoreState>, private taskHttpService: TaskHttpService) {
    store.select(getTasks).subscribe(tasks => (this.tasks = tasks));
  }

  handleRemoveTask() {
    if (!confirm('Are you sure you want to clear all tasks?')) {
      return;
    }

    this.store.dispatch(setLoading({ loading: true }));
    this.taskHttpService
      .removeAll(this.tasks.map(i => i._id))
      .pipe(
        map(() => this.store.dispatch(removeAllTask())),
        catchError(err => of(alert(err.message))),
        finalize(() => this.store.dispatch(setLoading({ loading: false })))
      )
      .subscribe();
  }
}
