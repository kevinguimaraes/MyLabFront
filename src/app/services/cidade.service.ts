import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Cidade } from 'src/app/model/cidade';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/MyLab/api/cidade';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(private http: HttpClient) { }

  getCidades (): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(apiUrl)
      .pipe(
        tap(cidades => console.log('leu os cidades')),
        catchError(this.handleError('getCidade', []))
      );
  }

  getCidade(id: number): Observable<Cidade> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Cidade>(url).pipe(
      tap(_ => console.log(`leu o cidade id=${id}`)),
      catchError(this.handleError<Cidade>(`getCidade id=${id}`))
    );
  }

  addCidade (cidade: Cidade): Observable<Cidade> {
    return this.http.post<Cidade>(apiUrl, cidade, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((cidade: Cidade) => console.log(`adicionou o cidade com w/ id=${cidade.id}`)),
      catchError(this.handleError<Cidade>('addCidade'))
    );
  }

  updateCidade(cidade: Cidade): Observable<any> {
    return this.http.put(apiUrl, cidade, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${cidade.id}`)),
      catchError(this.handleError<any>('updateCidade'))
    );
  }

  deleteCidade (cidade: Cidade): Observable<Cidade> {
    const url = `${apiUrl}/${cidade.id}`;

    return this.http.delete<Cidade>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o cidade com id=${cidade.id}`)),
      catchError(this.handleError<Cidade>('deleteCidade'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
