import { Component, OnInit } from '@angular/core';
import { BibliothecaireService } from './api/bibliothecaire.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  // public appPages = [
  //   { title: 'Rechercher', url: '/rechercher' },
  //   { title: 'Contact', url: '/contact'},
  //   { title: 'Se connecter', url: '/login'}
  //   // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
  //   // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
  //   // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  // ];


  public menuHome = [
    { title: 'Rechercher', url: '/rechercher' },
    { title: 'Contact', url: '/contact'},
    { title: 'Se connecter', url: '/login'}
  ];

  appPages$ = this.bibliothecaireService.pages$;

  seDeconnecte$ = this.bibliothecaireService.seDeconnecte$;

  constructor(private bibliothecaireService: BibliothecaireService, private router: Router) {}

  ngOnInit() {
    console.log("démarrage app");
    console.log(this.seDeconnecte$.value);
    this.bibliothecaireService.pages$.next(this.menuHome);

  }

  seDeconnecter() {
    sessionStorage.removeItem('biblio');
    this.bibliothecaireService.seDeconnecte$.next({ affiche: false });
    this.bibliothecaireService.pages$.next(this.menuHome);
    this.router.navigateByUrl('');
  }

}
