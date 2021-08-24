import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private _historial: string[] = [];
  private apiKey: string = 'uWDnKh0wCvKWBqZXlzxX8V0A71bzOusd';
  private requestUrl = 'https://api.giphy.com/v1/gifs/search';
  public resultados: any;
  private apiUrl:string = environment.apiUrl
  constructor(private httpClient: HttpClient) {
  }

  searchGifs(query: string) {
    this.getGift(query);
    if (!this._historial.includes(query.toLocaleLowerCase())) {
      query.trim().length > 0
        ? this._historial.unshift(query.toLocaleLowerCase())
        : '';
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
  
  }

  getGift(query: string) {
    this.httpClient
      .get(this.requestUrl, {
        params: {
          api_key: this.apiKey,
          q: query,
          limit: '10',
        },
      })
      .subscribe((res: any) => {
        this.resultados = res.data;
      });
  }

  apiTestError():Observable<any>{
    return this.httpClient.get(
      `${this.apiUrl}/test/500`,
    ).pipe(catchError((error) => this.handleError(error)));
  }

  
  apiTestSuccess():Observable<any>{
    return this.httpClient.get(
      `${this.apiUrl}/test/200`,
    ).pipe(catchError((error) => this.handleError(error)));
  }

  apiTestNotFound():Observable<any>{
    return this.httpClient.get(
      `${this.apiUrl}/test/404`,
    ).pipe(catchError((error) => this.handleError(error)));
  }

  apiTestForbidden():Observable<any>{
    return this.httpClient.get(
      `${this.apiUrl}/test/403`,
    ).pipe(catchError((error) => this.handleError(error)));
  }

  protected handleError(response: HttpErrorResponse) {
    return throwError(response);
  }

}
