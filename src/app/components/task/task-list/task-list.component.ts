import { Component, OnInit } from '@angular/core';
import { map, catchError, of, finalize } from 'rxjs';
import { TaskHttpService } from 'src/app/http/task.http.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private taskHttpService: TaskHttpService,
    private spinnerService: SpinnerService
  ) {}

  get tasks() {
    return this.taskService.tasks;
  }

  ngOnInit(): void {
    this.spinnerService.setLoading(true);
    this.taskHttpService
      .getAll()
      .pipe(
        map(res => (this.taskService.tasks = res)),
        catchError(err => of(alert(err.message))),
        finalize(() => this.spinnerService.setLoading(false))
      )
      .subscribe();
  }
}
