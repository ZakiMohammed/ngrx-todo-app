import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-clear',
  templateUrl: './task-clear.component.html',
})
export class TaskClearComponent {
  @Input() tasks: Task[] = [];

  handleRemoveTask() {
    console.log('handleRemoveTask');
  }
}
