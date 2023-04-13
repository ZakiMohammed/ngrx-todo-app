import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, catchError, of, finalize } from 'rxjs';
import { TaskHttpService } from 'src/app/http/task.http.service';
import { Task } from 'src/app/models/task';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TaskState } from 'src/app/store';
import { editTask, removeTask } from 'src/app/store/actions';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input() task!: Task;

  constructor(
    private store: Store<{ taskReducer: TaskState }>,
    private taskHttpService: TaskHttpService,
    private spinnerService: SpinnerService
  ) {}

  handleEditTask() {
    this.store.dispatch(editTask({ task: this.task }));
  }

  handleRemoveTask() {
    this.spinnerService.setLoading(true);
    this.taskHttpService
      .remove(this.task._id)
      .pipe(
        map(() => this.store.dispatch(removeTask({ task: this.task }))),
        catchError(err => of(alert(err.message))),
        finalize(() => this.spinnerService.setLoading(false))
      )
      .subscribe();
  }
}
