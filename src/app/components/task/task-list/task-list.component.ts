import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, catchError, of, finalize } from 'rxjs';
import { TaskHttpService } from 'src/app/http/task.http.service';
import { Task } from 'src/app/models/task';
import { TaskStoreState, getTasks } from 'src/app/store';
import { getAllTask, setLoading } from 'src/app/store/actions';

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
        catchError(err => of(alert(err.message))),
        finalize(() => this.store.dispatch(setLoading({ loading: false })))
      )
      .subscribe();
  }
}
