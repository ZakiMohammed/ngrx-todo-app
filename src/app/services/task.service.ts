import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: Task[] = [];
  task = new BehaviorSubject<Task | null>(null);
}
