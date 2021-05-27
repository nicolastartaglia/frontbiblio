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

  baseUrl = "http://localhost:8082/abonne/";

  constructor(private httpClient: HttpClient, private router: Router, private bibliothecaireService: BibliothecaireService) { }

  ajouterUnAbonne(data: Abonne): Observable<any> {
    console.log(data);
    console.log(this.bibliothecaireService.headers);
    return this.httpClient.post(this.baseUrl, data, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: any) => {
          return data.id;
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
