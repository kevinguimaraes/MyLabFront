import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Tela } from 'src/app/model/tela';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/MyLab/api/tela';

@Injectable({
  providedIn: 'root'
})
export class TelaService {

  constructor(private http: HttpClient) { }

  getTelas (): Observable<Tela[]> {
    return this.http.get<Tela[]>(apiUrl)
      .pipe(
        tap(telas => console.log('leu os telas')),
        catchError(this.handleError('getTela', []))
      );
  }

  getTela(id: number): Observable<Tela> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Tela>(url).pipe(
      tap(_ => console.log(`leu o tela id=${id}`)),
      catchError(this.handleError<Tela>(`getTela id=${id}`))
    );
  }

  addTela (tela: Tela): Observable<Tela> {
    return this.http.post<Tela>(apiUrl, tela, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((tela: Tela) => console.log(`adicionou o tela com w/ id=${tela.id}`)),
      catchError(this.handleError<Tela>('addTela'))
    );
  }

  updateTela(tela: Tela): Observable<any> {
    return this.http.put(apiUrl, tela, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${tela.id}`)),
      catchError(this.handleError<any>('updateTela'))
    );
  }

  deleteTela (tela: Tela): Observable<Tela> {
    const url = `${apiUrl}/${tela.id}`;

    return this.http.delete<Tela>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o tela com id=${tela.id}`)),
      catchError(this.handleError<Tela>('deleteTela'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
