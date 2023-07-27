import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoResponse } from '../models/todo/TodoResponse.model';
import { IS_ACTIVE,ACTIVE,IS_INACTIVE,State } from 'src/app/models/todo/State';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient,
  ) { }

  private todoUrl = 'api/todos'

  getTodos(): Observable<TodoResponse[]>{
    return this.http.get<TodoResponse[]>(this.todoUrl)
  }
}
