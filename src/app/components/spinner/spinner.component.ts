import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskStoreState, getLoading } from 'src/app/store';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  loading = false;

  constructor(private store: Store<TaskStoreState>) {
    store.select(getLoading).subscribe(loading => (this.loading = loading));
  }
}
