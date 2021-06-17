import { Component, OnInit } from '@angular/core';
import { BibliothecaireService } from './api/bibliothecaire.service';
import { Router } from "@angular/router";
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public menuHome = [
    { title: 'Accueil', url: '/home' },
    { title: 'Rechercher', url: '/rechercher' },
    { title: 'Contact', url: '/contact'},
    { title: 'Se connecter', url: '/login'}
  ];

  appPages$ = this.bibliothecaireService.pages$;

  seDeconnecte$ = this.bibliothecaireService.seDeconnecte$;

  constructor(private bibliothecaireService: BibliothecaireService,
              public menuCtrl: MenuController,
              private router: Router) {}

  ngOnInit() {
    this.bibliothecaireService.pages$.next(this.menuHome);
  }

  seDeconnecter() {
    sessionStorage.removeItem('biblio');
    this.bibliothecaireService.seDeconnecte$.next({ affiche: false });
    this.bibliothecaireService.pages$.next(this.menuHome);
   // window.location.replace(this.bibliothecaireService.frontUrl);
    this.menuCtrl.close();
    this.router.navigateByUrl('/');
    this.router.navigateByUrl('/home');

  }

}
