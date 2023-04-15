import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, catchError, of, finalize } from 'rxjs';
import { TaskHttpService } from 'src/app/http/task.http.service';
import { Task } from 'src/app/models/task';
import { getAllTask, setError, setLoading } from 'src/app/store/actions';
import { TaskStoreState } from 'src/app/store/models';
import { getTasks } from 'src/app/store/selectors';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private store: Store<TaskStoreState>, private taskHttpService: TaskHttpService) {
    store.select(getTasks).subscribe(tasks => (this.tasks = tasks));
  }

  ngOnInit(): void {
    this.store.dispatch(setLoading({ loading: true }));
    this.taskHttpService
      .getAll()
      .pipe(
        map(res => this.store.dispatch(getAllTask({ tasks: res }))),
        catchError(error => of(this.store.dispatch(setError({ error: error.message })))),
        finalize(() => this.store.dispatch(setLoading({ loading: false })))
      )
      .subscribe();
  }
}
