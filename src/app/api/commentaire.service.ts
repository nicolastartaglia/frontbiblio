import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BibliothecaireService } from './bibliothecaire.service';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  baseUrlCommentaire = this.bibliothecaireService.backendUrl + "commentaire/";


  constructor(private httpClient: HttpClient, private bibliothecaireService: BibliothecaireService) { }

  obtenirTousLesCommentairesApprouvesSurUnObjet(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrlCommentaire+"objet/"+id, { headers: this.bibliothecaireService.headers })
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
