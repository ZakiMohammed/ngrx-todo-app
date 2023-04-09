import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  disable = false;

  constructor(private taskService: TaskService) {
    this.taskService.task.subscribe(task => {
      this.disable = !!task;
    })
  }
}
