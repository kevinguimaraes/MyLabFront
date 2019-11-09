import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Usuario } from 'src/app/model/usuario';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/MyLab/api/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarios (): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(apiUrl)
      .pipe(
        tap(usuarios => console.log('leu os usuarios')),
        catchError(this.handleError('getUsuario', []))
      );
  }

  getUsuario(id: number): Observable<Usuario> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Usuario>(url).pipe(
      tap(_ => console.log(`leu o usuario id=${id}`)),
      catchError(this.handleError<Usuario>(`getUsuario id=${id}`))
    );
  }

  addUsuario (usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(apiUrl, usuario, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((usuario: Usuario) => console.log(`adicionou o usuario com w/ id=${usuario.id}`)),
      catchError(this.handleError<Usuario>('addUsuario'))
    );
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    return this.http.put(apiUrl, usuario, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${usuario.id}`)),
      catchError(this.handleError<any>('updateUsuario'))
    );
  }

  deleteUsuario (usuario: Usuario): Observable<Usuario> {
    const url = `${apiUrl}/${usuario.id}`;

    return this.http.delete<Usuario>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o usuario com id=${usuario.id}`)),
      catchError(this.handleError<Usuario>('deleteUsuario'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
