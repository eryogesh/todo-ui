import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  getLists(): Observable<List[]> {
    return this.http.get<List[]>(environment.listsApiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateLists(lists: List[]): Observable<List[]> {
    return this.http.put<List[]>(environment.listsApiUrl, lists)
      .pipe(
        catchError(this.handleError)
      );
  }
}
