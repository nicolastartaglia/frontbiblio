import { Injectable } from '@angular/core';
import { Abonne } from '../models/abonne';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BibliothecaireService } from './bibliothecaire.service';


@Injectable({
  providedIn: 'root'
})
export class AbonneService {

  baseUrl = "http://192.168.200.176:8082/abonne/";

  refreshAbonnes = new BehaviorSubject<boolean>(true);

  constructor(private httpClient: HttpClient, private router: Router, private bibliothecaireService: BibliothecaireService) { }


  obtenirQuelquesAbonnes(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl+'recherche', data, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: any) => {
          // if(!data.message) {
          //   data.sort((a, b) => {
          //     return a.Nom.localeCompare(b.Nom);
          //   });
          // }
          // console.log(data);
          return data;
        }),
        catchError(this.errorMgmt)
      );
  }


  ajouterUnAbonne(data: Abonne): Observable<any> {
    return this.httpClient.post(this.baseUrl, data, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: any) => {
          return data.id;
        }),
        catchError(this.errorMgmt)
      );
  }

  mettreAjourUnAbonne(id: number, data: Abonne): Observable<any> {
    return this.httpClient.put(this.baseUrl + id, data, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        }),
        catchError(this.errorMgmt)
      );
  }

  supprimerUnAbonne(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl+id, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: any) => {
          return data.message;
        }),
        catchError(this.errorMgmt)
      );
  }

  obtenirUnAbonne(id: string ): Observable<any> {
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
