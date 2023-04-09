import { Component } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  title = '';

  handleSubmit() {
    console.log('handleSubmit');

    if (this.title === '') {
      window.alert('Please enter title of your task');
      return;
    }

    console.log(this.title);
  }
}
