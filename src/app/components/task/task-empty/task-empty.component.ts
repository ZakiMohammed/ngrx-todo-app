import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-empty',
  templateUrl: './task-empty.component.html',
})
export class TaskEmptyComponent {
  constructor(private taskService: TaskService) {}

  get tasks() {
    return this.taskService.tasks;
  }
}
