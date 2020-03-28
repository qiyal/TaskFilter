import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataControlService {

  constructor(private _http: HttpClient) {
  }

  getAllTasks(page: string): Observable<any> {
    return this._http.get('http://localhost:3000/tasks?' + page + '&_sort=name&_order=desc');
  }

  createTask(task: any) {
    return this._http.post('http://localhost:3000/tasks', task);
  }

  updateTask(task: any) {
    return this._http.put('http://localhost:3000/tasks/' + task.id, task);
  }

  deleteTask(id) {
    return this._http.delete('http://localhost:3000/tasks/' + id);
  }
}
