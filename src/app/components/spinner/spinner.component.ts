import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  constructor(private spinnerService: SpinnerService) {}

  public get loading() {
    return this.spinnerService.loading;
  }
}
