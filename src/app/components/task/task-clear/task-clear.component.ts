import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, catchError, of, finalize } from 'rxjs';
import { TaskHttpService } from 'src/app/http/task.http.service';
import { Task } from 'src/app/models/task';
import { removeAllTask, setError, setLoading } from 'src/app/store/actions';
import { TaskStoreState } from 'src/app/store/models';
import { getErrorMessage, getTasks } from 'src/app/store/selectors';

@Component({
  selector: 'app-task-clear',
  templateUrl: './task-clear.component.html',
})
export class TaskClearComponent {
  tasks: Task[] = [];
  errorMessage: string | null = null;

  constructor(private store: Store<TaskStoreState>, private taskHttpService: TaskHttpService) {
    store.select(getTasks).subscribe(tasks => (this.tasks = tasks));
    store.select(getErrorMessage).subscribe(errorMessage => (this.errorMessage = errorMessage));
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
        catchError(error => of(this.store.dispatch(setError({ error: error.message })))),
        finalize(() => this.store.dispatch(setLoading({ loading: false })))
      )
      .subscribe();
  }
}
