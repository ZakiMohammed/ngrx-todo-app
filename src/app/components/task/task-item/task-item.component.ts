import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map, catchError, of, finalize } from 'rxjs';
import { Task } from 'src/app/models/task';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();

  constructor(private taskService: TaskService, private spinnerService: SpinnerService) {}

  handleEditTask() {
    this.edit.emit(this.task);
  }

  handleRemoveTask() {
    this.spinnerService.setLoading(true);
    this.taskService
      .remove(this.task._id)
      .pipe(
        map(() => this.remove.emit(this.task)),
        catchError(err => of(alert(err.message))),
        finalize(() => this.spinnerService.setLoading(false))
      )
      .subscribe();
  }
}
