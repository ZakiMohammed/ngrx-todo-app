import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskStoreState, getTask } from 'src/app/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  disable = false;

  constructor(
    private store: Store<TaskStoreState>) {
    this.store.select(getTask).subscribe(task => {
      this.disable = !!task;
    })
  }
}
