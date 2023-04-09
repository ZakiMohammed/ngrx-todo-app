import { Component } from '@angular/core';
import { map, catchError, of, finalize } from 'rxjs';
import { TaskHttpService } from 'src/app/http/task.http.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-clear',
  templateUrl: './task-clear.component.html',
})
export class TaskClearComponent {
  constructor(
    private taskService: TaskService,
    private taskHttpService: TaskHttpService,
    private spinnerService: SpinnerService
  ) {}

  get tasks() {
    return this.taskService.tasks;
  }

  handleRemoveTask() {
    this.spinnerService.setLoading(true);
    this.taskHttpService
      .removeAll(this.tasks.map(i => i._id))
      .pipe(
        map(() => (this.taskService.tasks = [])),
        catchError(err => of(alert(err.message))),
        finalize(() => this.spinnerService.setLoading(false))
      )
      .subscribe();
  }
}
