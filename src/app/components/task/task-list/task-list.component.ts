import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, catchError, of, finalize } from 'rxjs';
import { TaskHttpService } from 'src/app/http/task.http.service';
import { Task } from 'src/app/models/task';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TaskState } from 'src/app/store';
import { getAllTask } from 'src/app/store/actions';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private store: Store<{ taskReducer: TaskState }>,
    private taskHttpService: TaskHttpService,
    private spinnerService: SpinnerService
  ) {
    store.select('taskReducer').subscribe(state => (this.tasks = state.tasks));
  }

  ngOnInit(): void {
    this.spinnerService.setLoading(true);
    this.taskHttpService
      .getAll()
      .pipe(
        map(res => this.store.dispatch(getAllTask({ tasks: res }))),
        catchError(err => of(alert(err.message))),
        finalize(() => this.spinnerService.setLoading(false))
      )
      .subscribe();
  }
}
