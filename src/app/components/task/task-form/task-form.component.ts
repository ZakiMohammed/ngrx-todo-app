import { Component } from '@angular/core';
import { map, catchError, of, finalize } from 'rxjs';
import { TaskHttpService } from 'src/app/http/task.http.service';
import { Task } from 'src/app/models/task';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  task: Task | null = null;
  title = '';

  constructor(
    private taskService: TaskService,
    private taskHttpService: TaskHttpService,
    private spinnerService: SpinnerService
  ) {
    this.taskService.task.subscribe(task => {
      this.task = task;
      this.title = task ? task.title : this.title;
    });
  }

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

      this.taskHttpService
        .add(newTask)
        .pipe(
          map(task => {
            this.taskService.tasks.push(task);
            this.title = '';
          }),
          catchError(err => of(alert(err.message))),
          finalize(() => this.spinnerService.setLoading(false))
        )
        .subscribe();
    } else {
      this.task.title = this.title;

      this.taskHttpService
        .update(this.task._id, this.task)
        .pipe(
          map(task => {
            const index = this.taskService.tasks.findIndex(i => i._id === task._id);
            this.taskService.tasks[index] = task;

            this.taskService.task.next(null);
            this.title = '';
          }),
          catchError(err => of(alert(err.message))),
          finalize(() => this.spinnerService.setLoading(false))
        )
        .subscribe();
    }
  }
}
