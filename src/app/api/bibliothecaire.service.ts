import { Injectable } from '@angular/core';
import { Bibliothecaire } from '../models/bibliothecaire';
import { Connexion } from '../models/connexion';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface CorpsJeton {
  id: string;
  Nom: string;
  Prenom: string;
  Email: string;
  Referent: boolean;
  exp: number;
  iat: number;
}


@Injectable({
  providedIn: 'root'
})
export class BibliothecaireService {
  pages$: BehaviorSubject<{ url: string, title: string }[]> =
    new BehaviorSubject([
      { url: '/rechercher', title: 'Rechercher' },
      { url: '/contact', title: 'Contact' },
      { url: '/login', title: 'Se connecter' }
    ]);

  seDeconnecte$: BehaviorSubject<{ affiche: boolean }> = new BehaviorSubject({ affiche: false });

  refreshBibliothecaires = new BehaviorSubject<boolean>(true);

  baseUrl = "http://localhost:8082/bibliothecaire/";
  headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.recupererJeton()}`);


  private jeton: string;

  constructor(private httpClient: HttpClient, private router: Router) { }

  private enregistrerJeton(jeton: string) {
    sessionStorage.setItem('biblio', jeton);
    this.jeton = jeton;
  }

  private recupererJeton(): string {
    if (!this.jeton) {
      this.jeton = sessionStorage.getItem('biblio');
    }
    return this.jeton;
  }


  seConnecter(bibliothecaire: Connexion): Observable<any> {
    return this.httpClient.post(this.baseUrl + "connexion", bibliothecaire)
      .pipe(
        map((data: any) => {
          if (data.accessToken) {
            this.enregistrerJeton(data.accessToken);
          }
          return data;
        }),
        catchError(this.errorMgmt)
      );
    // return this.http.get(`${this.url}/getOne/${id}`);
  }



  recupererDonneesJeton(): CorpsJeton {
    const jeton = this.recupererJeton();
    let donneesJeton;
    if (jeton) {
      donneesJeton = jeton.split('.')[1];
      donneesJeton = window.atob(donneesJeton);
      return JSON.parse(donneesJeton);
    } else {
      return null;
    }
  }


  estConnecte(): boolean {
    const corpsJeton = this.recupererDonneesJeton();
    if (corpsJeton) {
      return corpsJeton.exp > Date.now() / 1000;
    }
    return false;
  }

  estReferent(): boolean {
    const corpsJeton = this.recupererDonneesJeton();
    return corpsJeton.Referent;
  }

  seDeconnecter(): void {
    this.jeton = '';
    sessionStorage.removeItem('biblio');
  }


  obtenirTousLesBibliothecaires(): Observable<any> {
    return this.httpClient.get(this.baseUrl, { headers: this.headers })
      .pipe(
        map((data: any) => {
          data.sort((a, b) => {
            return a.Nom.localeCompare(b.Nom);
          });
          console.log("nouvelle liste");
          console.log(data);
          return data;
        }),
        catchError(this.errorMgmt)
      );
  }

  obtenirUnBibliothecaire(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + id, { headers: this.headers })
      .pipe(
        map((data: any) => {
          console.log(data);
          return data;
        }),
        catchError(this.errorMgmt)
      );
  }

  mettreAjourUnBibliothecaire(id: number, data: Bibliothecaire): Observable<any> {
    return this.httpClient.put(this.baseUrl + id, data, { headers: this.headers })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        }),
        catchError(this.errorMgmt)
      );
  }

  ajouterUnBibliothecaire(data: Bibliothecaire): Observable<any> {
    return this.httpClient.post(this.baseUrl, data, { headers: this.headers })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        }),
        catchError(this.errorMgmt)
      );
  }


  supprimerUnBibliothecaire(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + id, { headers: this.headers })
      .pipe(
        map((res: any) => {

          console.log(res);
          return res;
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
