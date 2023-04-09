import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url: string = `${environment.apiUrl}todos`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Task[]>(this.url);
  }

  add(task: Task) {
    return this.http.post(this.url, task);
  }

  update(id: number, task: Task) {
    return this.http.put(`${this.url}/${id}`, task);
  }

  remove(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  removeAll(ids: number[]) {
    const deletes = ids.map(id => this.http.delete(`${this.url}/${id}`))
    return forkJoin(deletes);
  }
}
