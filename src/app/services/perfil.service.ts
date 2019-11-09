import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Perfil } from 'src/app/model/perfil';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/MyLab/api/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }

  getPerfils (): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(apiUrl)
      .pipe(
        tap(perfils => console.log('leu os perfils')),
        catchError(this.handleError('getPerfil', []))
      );
  }

  getPerfil(id: number): Observable<Perfil> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Perfil>(url).pipe(
      tap(_ => console.log(`leu o perfil id=${id}`)),
      catchError(this.handleError<Perfil>(`getPerfil id=${id}`))
    );
  }

  addPerfil (perfil: Perfil): Observable<Perfil> {
    return this.http.post<Perfil>(apiUrl, perfil, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((perfil: Perfil) => console.log(`adicionou o perfil com w/ id=${perfil.id}`)),
      catchError(this.handleError<Perfil>('addPerfil'))
    );
  }

  updatePerfil(perfil: Perfil): Observable<any> {
    return this.http.put(apiUrl, perfil, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${perfil.id}`)),
      catchError(this.handleError<any>('updatePerfil'))
    );
  }

  deletePerfil (perfil: Perfil): Observable<Perfil> {
    const url = `${apiUrl}/${perfil.id}`;

    return this.http.delete<Perfil>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o perfil com id=${perfil.id}`)),
      catchError(this.handleError<Perfil>('deletePerfil'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
