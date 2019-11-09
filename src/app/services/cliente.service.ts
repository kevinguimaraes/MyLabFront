import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Cliente } from 'src/app/model/cliente';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/MyLab/api/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  getClientes (): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(apiUrl)
      .pipe(
        tap(clientes => console.log('leu os clientes')),
        catchError(this.handleError('getCliente', []))
      );
  }

  getCliente(id: number): Observable<Cliente> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Cliente>(url).pipe(
      tap(_ => console.log(`leu o cliente id=${id}`)),
      catchError(this.handleError<Cliente>(`getCliente id=${id}`))
    );
  }

  addCliente (cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(apiUrl, cliente, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((cliente: Cliente) => console.log(`adicionou o cliente com w/ id=${cliente.id}`)),
      catchError(this.handleError<Cliente>('addCliente'))
    );
  }

  updateCliente(cliente: Cliente): Observable<any> {
    return this.http.put(apiUrl, cliente, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${cliente.id}`)),
      catchError(this.handleError<any>('updateCliente'))
    );
  }

  deleteCliente (cliente: Cliente): Observable<Cliente> {
    const url = `${apiUrl}/${cliente.id}`;

    return this.http.delete<Cliente>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o cliente com id=${cliente.id}`)),
      catchError(this.handleError<Cliente>('deleteCliente'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
