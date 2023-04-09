import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() edit = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();

  handleEditTask(task: Task) {
    this.edit.emit(task);
  }

  handleRemoveTask(task: Task) {
    this.remove.emit(task);
  }
}
