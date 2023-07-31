import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { Observable,catchError,throwError } from 'rxjs';
import { TodoResponse } from '../../models/todo/TodoResponse.model';
import { IS_ACTIVE,ACTIVE,IS_INACTIVE,State,toState } from 'src/app/models/todo/State';
import { environment } from 'src/environments/environment.development';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http  : HttpClient,
    private router: Router
  ) { }

  getTodos(): Observable<TodoResponse[]>{
    const url = `${environment.apiUrl}/todo`;

    return this.http.get<TodoResponse[]>(url).pipe
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

  getStateName(code:number):string {
    try{
      const state: State = toState(code);
      return state.name;
    }catch{
      this.router.navigate(['error'])
      return "";
    }
  }

  private handleError(error: HttpErrorResponse,router:Router) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    }else if(error.status === 500){
      router.navigate(['error'])
    }else {
      console.error(
        `Backend returned code`, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
