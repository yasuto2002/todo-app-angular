import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable,catchError,throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryResponse } from 'src/app/models/category/CategoryResponse.model';
import { Color, toColor } from 'src/app/models/category/Color';
import { CategoryIdResponse } from 'src/app/models/category/CategoryIdResponse.model';
import { CategoryRequest } from 'src/app/models/category/CategoryRequest.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http  : HttpClient,
    private router: Router
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getCategories(): Observable<CategoryResponse[]>{
    const url = `${environment.apiUrl}/category`;
    return this.http.get<CategoryResponse[]>(url).pipe
    (
      catchError(error => this.handleError(error,this.router))
    )
  }

  getCategory(id:number): Observable<CategoryResponse>{
    const url = `${environment.apiUrl}/category/${id}`
    return this.http.get<CategoryResponse>(url).pipe
    (
      catchError(error => this.handleError(error,this.router))
    )
  }

  addCategory(category:CategoryRequest): Observable<HttpResponse<CategoryIdResponse>>{
    const url = `${environment.apiUrl}/category`
    return this.http.post<CategoryIdResponse>(url, category, {observe: 'response'}).pipe(
      catchError(error => this.handleError(error,this.router))
    );
  }

  updateCategory(category:CategoryRequest,categoryId:number):Observable<CategoryResponse>{
    const url = `${environment.apiUrl}/category/${categoryId}`
    return this.http.put<CategoryResponse>(url, category, this.httpOptions).pipe(
      catchError(error => this.handleError(error,this.router))
    );
  }

  getColorName(code:number):string {
    try{
      const color: Color = toColor(code);
      return color.name;
    }catch{
      this.router.navigate(['error'])
      console.error('color conversion error');
      
      return "";
    }
  }

  private handleError(error: HttpErrorResponse,router:Router) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    }else if(error.status === 500){
      router.navigate(['error'],{ queryParams: { message: 'api server error'}})
    }else {
      console.error(
        `Backend returned code`, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
