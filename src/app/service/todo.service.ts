import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { Observable,catchError,throwError } from 'rxjs';
import { TodoResponse } from '../models/todo/TodoResponse.model';
import { IS_ACTIVE,ACTIVE,IS_INACTIVE,State } from 'src/app/models/todo/State';
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

  private todoUrl = `${environment.apiUrl}/todo`

  getTodos(): Observable<TodoResponse[]>{
    return this.http.get<TodoResponse[]>(this.todoUrl).pipe
    (
      catchError(error => this.handleError(error,this.router))
    )
  }

  toState(code:number):State {
    switch(code){
        case 0:
            return IS_INACTIVE
        case 1:
            return IS_ACTIVE
        case 2:
            return ACTIVE
        default:
            return IS_INACTIVE
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
