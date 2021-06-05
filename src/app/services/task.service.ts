import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { concat, Observable, scheduled, throwError } from 'rxjs';
import { switchMap, mergeMap, catchError, concatMap, delay } from 'rxjs/operators';
import { Task } from '../Task';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnInit{
  private apiUrl = 'http://localhost:5000/tasks';
  private registerUrl = 'http://localhost:5000/register';
  private loginUrl = 'http://localhost:5000/login';
  private accessToken: string;
  private httpOptionsAuth: { headers: HttpHeaders };

  constructor(private http: HttpClient) {}

  ngOnInit() : void {}

  setAccessToken(token: string) {
    this.accessToken = token;

    this.httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + this.accessToken
      }),
    };
  }

  login() {
    var loginJson = JSON.parse('{ "email":"test@mail.com", "password":"hell0" }');

    return this.http.post(this.loginUrl, loginJson, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, this.httpOptionsAuth)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url, this.httpOptionsAuth)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, this.httpOptionsAuth)
      .pipe(
        catchError(this.handleError)
      );
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, this.httpOptionsAuth)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg:string  = "";

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMsg = 'An error occurred:' + error.error;
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMsg = 
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`;
    }

    console.error(errorMsg);
    alert(errorMsg);

    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
