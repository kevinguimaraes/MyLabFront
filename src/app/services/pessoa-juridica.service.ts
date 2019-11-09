import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { PessoaJuridica } from 'src/app/model/pessoa-juridica';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/MyLab/api/pessoajuridica';

@Injectable({
  providedIn: 'root'
})
export class PessoaJuridicaService {

  constructor(private http: HttpClient) { }

  getPessoaJuridicas (): Observable<PessoaJuridica[]> {
    return this.http.get<PessoaJuridica[]>(apiUrl)
      .pipe(
        tap(pessoaJuridicas => console.log('leu os pessoaJuridicas')),
        catchError(this.handleError('getPessoaJuridica', []))
      );
  }

  getPessoaJuridica(id: number): Observable<PessoaJuridica> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<PessoaJuridica>(url).pipe(
      tap(_ => console.log(`leu o pessoaJuridica id=${id}`)),
      catchError(this.handleError<PessoaJuridica>(`getPessoaJuridica id=${id}`))
    );
  }

  addPessoaJuridica (pessoaJuridica: PessoaJuridica): Observable<PessoaJuridica> {
    return this.http.post<PessoaJuridica>(apiUrl, pessoaJuridica, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((pessoaJuridica: PessoaJuridica) => console.log(`adicionou o pessoaJuridica com w/ id=${pessoaJuridica.id}`)),
      catchError(this.handleError<PessoaJuridica>('addPessoaJuridica'))
    );
  }

  updatePessoaJuridica(pessoaJuridica: PessoaJuridica): Observable<any> {
    return this.http.put(apiUrl, pessoaJuridica, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${pessoaJuridica.id}`)),
      catchError(this.handleError<any>('updatePessoaJuridica'))
    );
  }

  deletePessoaJuridica (pessoaJuridica: PessoaJuridica): Observable<PessoaJuridica> {
    const url = `${apiUrl}/${pessoaJuridica.id}`;

    return this.http.delete<PessoaJuridica>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o pessoaJuridica com id=${pessoaJuridica.id}`)),
      catchError(this.handleError<PessoaJuridica>('deletePessoaJuridica'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
