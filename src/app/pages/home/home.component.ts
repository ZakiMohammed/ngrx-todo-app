import { Component, OnInit } from '@angular/core';
import { catchError, finalize, map, of } from 'rxjs';
import { Task } from 'src/app/models/task';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  task: Task | null = null;

  constructor(private taskService: TaskService, private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.spinnerService.setLoading(true);
    this.taskService
      .getAll()
      .pipe(
        map(res => (this.tasks = res)),
        catchError(err => of(alert(err.message))),
        finalize(() => this.spinnerService.setLoading(false))
      )
      .subscribe();
  }

  handleAdd(task: Task) {
    this.tasks.push(task);
  }

  handleUpdate(task: Task) {
    const index = this.tasks.findIndex(i => i._id === task._id);
    this.tasks[index] = task;
  }

  handleEditTask(task: Task) {
    this.task = task;
  }

  handleRemoveTask(task: Task) {
    const index = this.tasks.findIndex(i => i._id === task._id);
    this.tasks.splice(index, 1);
  }

  handleRemoveAll() {
    this.tasks = [];
  }
}
