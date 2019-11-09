import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Pais } from 'src/app/model/pais';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/MyLab/api/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  getPaiss (): Observable<Pais[]> {
    return this.http.get<Pais[]>(apiUrl)
      .pipe(
        tap(paiss => console.log('leu os paiss')),
        catchError(this.handleError('getPais', []))
      );
  }

  getPais(id: number): Observable<Pais> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Pais>(url).pipe(
      tap(_ => console.log(`leu o pais id=${id}`)),
      catchError(this.handleError<Pais>(`getPais id=${id}`))
    );
  }

  addPais (pais: Pais): Observable<Pais> {
    return this.http.post<Pais>(apiUrl, pais, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((pais: Pais) => console.log(`adicionou o pais com w/ id=${pais.id}`)),
      catchError(this.handleError<Pais>('addPais'))
    );
  }

  updatePais(pais: Pais): Observable<any> {
    return this.http.put(apiUrl, pais, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${pais.id}`)),
      catchError(this.handleError<any>('updatePais'))
    );
  }

  deletePais (pais: Pais): Observable<Pais> {
    const url = `${apiUrl}/${pais.id}`;

    return this.http.delete<Pais>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o pais com id=${pais.id}`)),
      catchError(this.handleError<Pais>('deletePais'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
