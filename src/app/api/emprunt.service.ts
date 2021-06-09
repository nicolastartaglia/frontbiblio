import { Injectable } from '@angular/core';
import { Emprunt } from '../models/emprunt';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BibliothecaireService } from './bibliothecaire.service';




@Injectable({
  providedIn: 'root'
})
export class EmpruntService {

  baseUrlEmprunt = this.bibliothecaireService.backendUrl + "emprunt/";

  dureeMaximumEnJoursEmprunt = 21;
  nombreMaxObjetsEmpruntes = 5;
  dureeMaxReservation = 5;

  constructor(private httpClient: HttpClient, private bibliothecaireService: BibliothecaireService) { }

  emprunterDesObjets(data: object): Observable<any> {
    return this.httpClient.post(this.baseUrlEmprunt, data, { headers: this.bibliothecaireService.headers })
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
