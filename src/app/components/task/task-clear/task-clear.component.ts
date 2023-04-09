import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map, catchError, of, finalize } from 'rxjs';
import { Task } from 'src/app/models/task';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-clear',
  templateUrl: './task-clear.component.html',
})
export class TaskClearComponent {
  @Input() tasks: Task[] = [];
  @Output() removeAll = new EventEmitter();

  constructor(private taskService: TaskService, private spinnerService: SpinnerService) {}

  handleRemoveTask() {
    this.spinnerService.setLoading(true);
    this.taskService
      .removeAll(this.tasks.map(i => i._id))
      .pipe(
        map(() => this.removeAll.emit()),
        catchError(err => of(alert(err.message))),
        finalize(() => this.spinnerService.setLoading(false))
      )
      .subscribe();
  }
}
