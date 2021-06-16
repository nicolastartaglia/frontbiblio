import { Component, OnInit } from '@angular/core';
import { BibliothecaireService } from './api/bibliothecaire.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public menuHome = [
    { title: 'Rechercher', url: '/rechercher' },
    { title: 'Contact', url: '/contact'},
    { title: 'Se connecter', url: '/login'}
  ];

  appPages$ = this.bibliothecaireService.pages$;

  seDeconnecte$ = this.bibliothecaireService.seDeconnecte$;

  constructor(private bibliothecaireService: BibliothecaireService, private router: Router) {}

  ngOnInit() {
    this.bibliothecaireService.pages$.next(this.menuHome);
  }

  seDeconnecter() {
    sessionStorage.removeItem('biblio');
    this.bibliothecaireService.seDeconnecte$.next({ affiche: false });
    this.bibliothecaireService.pages$.next(this.menuHome);
    window.location.replace(this.bibliothecaireService.frontUrl + "/home");
  }

}
