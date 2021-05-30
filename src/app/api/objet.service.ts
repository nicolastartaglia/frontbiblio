import { Injectable } from '@angular/core';
import { Objet } from '../models/objet';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BibliothecaireService } from './bibliothecaire.service';

@Injectable({
  providedIn: 'root'
})
export class ObjetService {

  baseUrl = "http://192.168.200.176:8082/objet/";

  NomRecherche = '';
  PrenomRecherche = '';
  EmailRecherche = '';

  refreshObjets = new BehaviorSubject<boolean>(true);

  constructor(private httpClient: HttpClient, private bibliothecaireService: BibliothecaireService) { }

  obtenirQuelquesObjets(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl+'recherche', data, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: any) => {
          if(!data.message) {
            data.sort((a, b) => {
              return a.Nom.localeCompare(b.Nom);
            });
          }
          console.log(data);
          return data;
        }),
        catchError(this.errorMgmt)
      );
  }


  ajouterUnObjet(data: Objet): Observable<any> {
    return this.httpClient.post(this.baseUrl, data, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: any) => {
          return data.id;
        }),
        catchError(this.errorMgmt)
      );
  }

  mettreAjourUnObjet(id: number, data: Objet): Observable<any> {
    return this.httpClient.put(this.baseUrl + id, data, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        }),
        catchError(this.errorMgmt)
      );
  }

  supprimerUnObjet(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl+id, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: any) => {
          return data.message;
        }),
        catchError(this.errorMgmt)
      );
  }

  obtenirUnObjet(id: number ): Observable<any> {
    return this.httpClient.get(this.baseUrl+id, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.errorMgmt)
      );
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
