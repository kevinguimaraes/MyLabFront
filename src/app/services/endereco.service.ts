import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Endereco } from 'src/app/model/endereco';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/MyLab/api/endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) { }

  getEnderecos (): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(apiUrl)
      .pipe(
        tap(enderecos => console.log('leu os enderecos')),
        catchError(this.handleError('getEndereco', []))
      );
  }

  getEndereco(id: number): Observable<Endereco> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Endereco>(url).pipe(
      tap(_ => console.log(`leu o endereco id=${id}`)),
      catchError(this.handleError<Endereco>(`getEndereco id=${id}`))
    );
  }

  addEndereco (endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(apiUrl, endereco, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((endereco: Endereco) => console.log(`adicionou o endereco com w/ id=${endereco.id}`)),
      catchError(this.handleError<Endereco>('addEndereco'))
    );
  }

  updateEndereco(endereco: Endereco): Observable<any> {
    return this.http.put(apiUrl, endereco, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${endereco.id}`)),
      catchError(this.handleError<any>('updateEndereco'))
    );
  }

  deleteEndereco (endereco: Endereco): Observable<Endereco> {
    const url = `${apiUrl}/${endereco.id}`;

    return this.http.delete<Endereco>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o endereco com id=${endereco.id}`)),
      catchError(this.handleError<Endereco>('deleteEndereco'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
