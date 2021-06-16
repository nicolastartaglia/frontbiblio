import { Injectable } from '@angular/core';
import { Abonne } from '../models/abonne';
import { Emprunt } from '../models/emprunt';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BibliothecaireService } from './bibliothecaire.service';


interface EmpruntDUnAbonne {
  idAbonne: number;
  Statut: string;
}

@Injectable({
  providedIn: 'root'
})
export class AbonneService {

  baseUrlAbonne = this.bibliothecaireService.backendUrl + "abonne/";

  NomRecherche = '';
  PrenomRecherche = '';
  EmailRecherche = '';

  refreshAbonnes = new BehaviorSubject<boolean>(true);

  constructor(private httpClient: HttpClient, private bibliothecaireService: BibliothecaireService) { }

  obtenirQuelquesAbonnes(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrlAbonne+'recherche', data, { headers: this.bibliothecaireService.headers })
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


  ajouterUnAbonne(data: Abonne): Observable<any> {
    return this.httpClient.post(this.baseUrlAbonne, data, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: any) => {
          return data.id;
        }),
        catchError(this.errorMgmt)
      );
  }

  mettreAjourUnAbonne(id: number, data: Abonne): Observable<any> {
    return this.httpClient.put(this.baseUrlAbonne + id, data, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        }),
        catchError(this.errorMgmt)
      );
  }

  supprimerUnAbonne(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrlAbonne+id, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: any) => {
          return data.message;
        }),
        catchError(this.errorMgmt)
      );
  }

  obtenirUnAbonne(id: number ): Observable<any> {
    return this.httpClient.get(this.baseUrlAbonne+id, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.errorMgmt)
      );
  }

  verifierAbonne(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrlAbonne+id+"/verifier", { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.errorMgmt)
      );
  }

  obtenirLeDernierEmpruntDunAbonne(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrlAbonne+"emprunt/"+id, { headers: this.bibliothecaireService.headers })
      .pipe(
        map((data: Emprunt) => {
          console.log(data);
          return data;
        }),
        catchError(this.errorMgmt)
      );
  }

  payerLAmende(id: number): Observable<any> {
    console.log(this.bibliothecaireService.headers);
    return this.httpClient.put(this.baseUrlAbonne+"payerAmende/"+id, {Amende: 0}, { headers: this.bibliothecaireService.headers })
    .pipe(
      map((data) => {
        console.log(data);
        return data;
      }),
      catchError(this.errorMgmt)
    );
  }

  renouvelerAbonnement(id: number, DateLimiteAbonnement: Date): Observable<any> {
    return this.httpClient.put(this.baseUrlAbonne+"renouvelerAbonnement/"+id, {DateLimiteAbonnement: DateLimiteAbonnement}, { headers: this.bibliothecaireService.headers })
    .pipe(
      map((data) => {
        console.log("data from bd");
        console.log(data);
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
