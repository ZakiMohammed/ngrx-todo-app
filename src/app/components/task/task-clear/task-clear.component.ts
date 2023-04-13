import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, catchError, of, finalize } from 'rxjs';
import { TaskHttpService } from 'src/app/http/task.http.service';
import { Task } from 'src/app/models/task';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TaskState } from 'src/app/store';
import { removeAllTask } from 'src/app/store/actions';

@Component({
  selector: 'app-task-clear',
  templateUrl: './task-clear.component.html',
})
export class TaskClearComponent {
  tasks: Task[] = [];

  constructor(
    private store: Store<{ taskReducer: TaskState }>,
    private taskHttpService: TaskHttpService,
    private spinnerService: SpinnerService
  ) {
    store.select('taskReducer').subscribe(state => (this.tasks = state.tasks));
  }

  handleRemoveTask() {
    this.spinnerService.setLoading(true);
    this.taskHttpService
      .removeAll(this.tasks.map(i => i._id))
      .pipe(
        map(() => this.store.dispatch(removeAllTask())),
        catchError(err => of(alert(err.message))),
        finalize(() => this.spinnerService.setLoading(false))
      )
      .subscribe();
  }
}
