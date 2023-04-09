import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
}
