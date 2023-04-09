import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Task } from 'src/app/models/task';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  tasks$?: Observable<Task[]>;

  constructor(private taskService: TaskService, private spinnerService: SpinnerService) {
    this.spinnerService.setLoading(true);
    this.tasks$ = taskService.getAll().pipe(tap(() => this.spinnerService.setLoading(false)));
  }
}
