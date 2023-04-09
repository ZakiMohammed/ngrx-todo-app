import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map, catchError, of, finalize } from 'rxjs';
import { Task } from 'src/app/models/task';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  @Input() set task(value: Task | null) {
    this._task = value;
    this.title = value?.title || '';
  }
  get task(): Task | null {
    return this._task;
  }

  @Output() add = new EventEmitter<Task>();
  @Output() update = new EventEmitter<Task>();

  _task: Task | null = null;
  title = '';

  constructor(private taskService: TaskService, private spinnerService: SpinnerService) {}

  handleSubmit() {
    if (this.title === '') {
      alert('Please enter title of your task');
      return;
    }

    this.spinnerService.setLoading(true);

    if (!this.task) {
      const newTask: Task = {
        _id: '',
        title: this.title,
      };

      this.taskService
        .add(newTask)
        .pipe(
          map(task => {
            this.add.emit(task);
            this.title = '';
          }),
          catchError(err => of(alert(err.message))),
          finalize(() => this.spinnerService.setLoading(false))
        )
        .subscribe();
    } else {
      this.task.title = this.title;

      this.taskService
        .update(this.task._id, this.task)
        .pipe(
          map(task => {
            this.update.emit(task);
            this.title = '';
          }),
          catchError(err => of(alert(err.message))),
          finalize(() => this.spinnerService.setLoading(false))
        )
        .subscribe();
    }
  }
}
