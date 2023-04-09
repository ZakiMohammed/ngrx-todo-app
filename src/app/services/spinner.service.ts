import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  loading = false;

  setLoading(loading: boolean) {
    this.loading = loading;
  }
}
