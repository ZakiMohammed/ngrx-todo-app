import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-empty',
  templateUrl: './task-empty.component.html'
})
export class TaskEmptyComponent {
  @Input() tasks: Task[] = [];
}
