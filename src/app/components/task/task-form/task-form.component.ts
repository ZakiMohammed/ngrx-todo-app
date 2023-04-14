import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, catchError, of, finalize } from 'rxjs';
import { TaskHttpService } from 'src/app/http/task.http.service';
import { Task } from 'src/app/models/task';
import { TaskStoreState, getTask } from 'src/app/store';
import { addTask, setLoading, updateTask } from 'src/app/store/actions';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  task: Task | null = null;
  title = '';

  constructor(private store: Store<TaskStoreState>, private taskHttpService: TaskHttpService) {
    this.store.select(getTask).subscribe(task => {
      this.task = task ? { ...task } : null;
      this.title = task ? task.title : this.title;
    });
  }

  handleSubmit() {
    if (this.title === '') {
      alert('Please enter title of your task');
      return;
    }

    this.store.dispatch(setLoading({ loading: true }));

    if (!this.task) {
      const newTask: Task = {
        _id: '',
        title: this.title,
      };

      this.taskHttpService
        .add(newTask)
        .pipe(
          map(task => {
            this.store.dispatch(addTask({ task }));
            this.title = '';
          }),
          catchError(err => of(alert(err.message))),
          finalize(() => this.store.dispatch(setLoading({ loading: false })))
        )
        .subscribe();
    } else {
      this.task.title = this.title;

      this.taskHttpService
        .update(this.task._id, this.task)
        .pipe(
          map(task => {
            this.store.dispatch(updateTask({ task }));
            this.title = '';
          }),
          catchError(err => of(alert(err.message))),
          finalize(() => this.store.dispatch(setLoading({ loading: false })))
        )
        .subscribe();
    }
  }
}
