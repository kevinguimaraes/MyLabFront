import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Medicao } from 'src/app/model/medicao';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/MyLab/api/medicao';

@Injectable({
  providedIn: 'root'
})
export class MedicaoService {

  constructor(private http: HttpClient) { }

  getMedicaos (): Observable<Medicao[]> {
    return this.http.get<Medicao[]>(apiUrl)
      .pipe(
        tap(medicaos => console.log('leu os medicaos')),
        catchError(this.handleError('getMedicao', []))
      );
  }

  getMedicao(id: number): Observable<Medicao> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Medicao>(url).pipe(
      tap(_ => console.log(`leu o medicao id=${id}`)),
      catchError(this.handleError<Medicao>(`getMedicao id=${id}`))
    );
  }

  addMedicao (medicao: Medicao): Observable<Medicao> {
    return this.http.post<Medicao>(apiUrl, medicao, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((medicao: Medicao) => console.log(`adicionou o medicao com w/ id=${medicao.id}`)),
      catchError(this.handleError<Medicao>('addMedicao'))
    );
  }

  updateMedicao(medicao: Medicao): Observable<any> {
    return this.http.put(apiUrl, medicao, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${medicao.id}`)),
      catchError(this.handleError<any>('updateMedicao'))
    );
  }

  deleteMedicao (medicao: Medicao): Observable<Medicao> {
    const url = `${apiUrl}/${medicao.id}`;

    return this.http.delete<Medicao>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o medicao com id=${medicao.id}`)),
      catchError(this.handleError<Medicao>('deleteMedicao'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
