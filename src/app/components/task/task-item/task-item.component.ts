import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();

  handleEditTask() {
    console.log('handleEditTask', this.task);
    this.edit.emit(this.task);
  }

  handleRemoveTask() {
    console.log('handleRemoveTask', this.task);
    this.remove.emit(this.task);
  }
}
