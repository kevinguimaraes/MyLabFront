import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Calibracao } from 'src/app/model/calibracao';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/MyLab/api/calibracao';

@Injectable({
  providedIn: 'root'
})
export class CalibracaoService {

  constructor(private http: HttpClient) { }

  getCalibracaos (): Observable<Calibracao[]> {
    return this.http.get<Calibracao[]>(apiUrl)
      .pipe(
        tap(calibracaos => console.log('leu os calibracaos')),
        catchError(this.handleError('getCalibracao', []))
      );
  }

  getCalibracao(id: number): Observable<Calibracao> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Calibracao>(url).pipe(
      tap(_ => console.log(`leu o calibracao id=${id}`)),
      catchError(this.handleError<Calibracao>(`getCalibracao id=${id}`))
    );
  }

  addCalibracao (calibracao: Calibracao): Observable<Calibracao> {
    return this.http.post<Calibracao>(apiUrl, calibracao, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((calibracao: Calibracao) => console.log(`adicionou o calibracao com w/ id=${calibracao.id}`)),
      catchError(this.handleError<Calibracao>('addCalibracao'))
    );
  }

  updateCalibracao(calibracao: Calibracao): Observable<any> {
    return this.http.put(apiUrl, calibracao, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${calibracao.id}`)),
      catchError(this.handleError<any>('updateCalibracao'))
    );
  }

  deleteCalibracao (calibracao: Calibracao): Observable<Calibracao> {
    const url = `${apiUrl}/${calibracao.id}`;

    return this.http.delete<Calibracao>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o calibracao com id=${calibracao.id}`)),
      catchError(this.handleError<Calibracao>('deleteCalibracao'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
