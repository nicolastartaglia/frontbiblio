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

  baseUrlObjet = this.bibliothecaireService.backendUrl + "objet/";

  TitreRecherche = '';
  AuteurArtisteRecherche = '';
  TypeObjetRecherche = '';

  refreshObjets = new BehaviorSubject<boolean>(true);

  constructor(private httpClient: HttpClient, private bibliothecaireService: BibliothecaireService) { }

  obtenirQuelquesObjets(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrlObjet+'recherche', data, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: any) => {
          if(!data.message) {
            data.sort((a, b) => {
              return a.Titre.localeCompare(b.Titre);
            });
          }
          console.log(data);
          return data;
        }),
        catchError(this.errorMgmt)
      );
  }


  ajouterUnObjet(data: Objet): Observable<any> {
    return this.httpClient.post(this.baseUrlObjet, data, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: any) => {
          return data.id;
        }),
        catchError(this.errorMgmt)
      );
  }

  mettreAjourUnObjet(id: number, data: Objet): Observable<any> {
    return this.httpClient.put(this.baseUrlObjet + id, data, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        }),
        catchError(this.errorMgmt)
      );
  }

  supprimerUnObjet(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrlObjet+id, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: any) => {
          return data.message;
        }),
        catchError(this.errorMgmt)
      );
  }

  obtenirUnObjet(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrlObjet+id, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.errorMgmt)
      );
  }

  obtenirUnObjetAEmprunter(data: object): Observable<any> {
    return this.httpClient.post(this.baseUrlObjet+"emprunt", data, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.errorMgmt)
      );
  }

  reserverUnObjet(data: object): Observable<any> {
    return this.httpClient.post(this.baseUrlObjet+"reserver", data, { headers: this.bibliothecaireService.headers })
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
