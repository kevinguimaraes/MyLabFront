import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Equipamento } from 'src/app/model/equipamento';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/MyLab/api/equipamento';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  constructor(private http: HttpClient) { }

  getEquipamentos (): Observable<Equipamento[]> {
    return this.http.get<Equipamento[]>(apiUrl)
      .pipe(
        tap(equipamentos => console.log('leu os equipamentos')),
        catchError(this.handleError('getEquipamento', []))
      );
  }

  getEquipamento(id: number): Observable<Equipamento> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Equipamento>(url).pipe(
      tap(_ => console.log(`leu o equipamento id=${id}`)),
      catchError(this.handleError<Equipamento>(`getEquipamento id=${id}`))
    );
  }

  addEquipamento (equipamento: Equipamento): Observable<Equipamento> {
    return this.http.post<Equipamento>(apiUrl, equipamento, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((equipamento: Equipamento) => console.log(`adicionou o equipamento com w/ id=${equipamento.id}`)),
      catchError(this.handleError<Equipamento>('addEquipamento'))
    );
  }

  updateEquipamento(equipamento: Equipamento): Observable<any> {
    return this.http.put(apiUrl, equipamento, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${equipamento.id}`)),
      catchError(this.handleError<any>('updateEquipamento'))
    );
  }

  deleteEquipamento (equipamento: Equipamento): Observable<Equipamento> {
    const url = `${apiUrl}/${equipamento.id}`;

    return this.http.delete<Equipamento>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o equipamento com id=${equipamento.id}`)),
      catchError(this.handleError<Equipamento>('deleteEquipamento'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
