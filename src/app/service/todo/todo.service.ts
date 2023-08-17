import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse,HttpHeaderResponse,HttpResponse,HttpEventType} from '@angular/common/http';
import { Observable,catchError,throwError,tap,map, mergeMap} from 'rxjs';
import { TodoListResponse } from '../../models/todo/TodoListResponse.model';
import { TodoResponse } from '../../models/todo/TodoResponse.model';
import { IS_ACTIVE,ACTIVE,IS_INACTIVE,State,toState } from 'src/app/models/todo/State';
import { environment } from 'src/environments/environment.development';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoRequest } from 'src/app/models/todo/TodoRequest.model';
import { TodoIdResponse } from 'src/app/models/todo/TodoIdResponse.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http  : HttpClient,
    private router: Router
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTodos(): Observable<TodoListResponse[]>{
    const url = `${environment.apiUrl}/todo`;

    return this.http.get<TodoListResponse[]>(url).pipe
    (
      catchError(error => this.handleError(error,this.router))
    )
  }

  getTodo(id:number): Observable<TodoResponse>{
    const url = `${environment.apiUrl}/todo/${id}`
    return this.http.get<TodoResponse>(url).pipe
    (
      catchError(error => this.handleError(error,this.router))
    )
  }

  addTodo(todo: TodoRequest): Observable<HttpResponse<TodoIdResponse>> {
    const url = `${environment.apiUrl}/todo`
    return this.http.post<TodoIdResponse>(url, todo, {observe: 'response'}).pipe(
      catchError(error => this.handleError(error,this.router))
    );
  }

  updateTodo(todo: TodoRequest,todoId:number): Observable<TodoResponse> {
    const url = `${environment.apiUrl}/todo/${todoId}`
    return this.http.put<TodoResponse>(url, todo, this.httpOptions).pipe(
      catchError(error => this.handleError(error,this.router))
    );
  }

  deleteTodo(todoId: number): Observable<TodoListResponse[]> {
    const url = `${environment.apiUrl}/todo/${todoId}`
    return this.http.delete<any>(url).pipe(
      mergeMap( _ =>
        this.getTodos()
      ),
      catchError(error => this.handleError(error,this.router))
    );
  }

  getStateName(code:number):string {
    try{
      const state: State = toState(code);
      return state.name;
    }catch{
      this.router.navigate(['error'])
      console.error('state conversion error');
      
      return "";
    }
  }

  private handleError(error: HttpErrorResponse,router:Router) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    }
    else if(error.status === 400 || error.status === 404 || error.status === 500){
      router.navigate(['error'],{ queryParams: { message: error.message}})
    }else {
      console.error(
        `Backend returned code`, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
