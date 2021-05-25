import { Component } from '@angular/core';
import { BibliothecaireService } from './api/bibliothecaire.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // public appPages = [
  //   { title: 'Rechercher', url: '/rechercher' },
  //   { title: 'Contact', url: '/contact'},
  //   { title: 'Se connecter', url: '/login'}
  //   // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
  //   // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
  //   // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  // ];

  appPages$ = this.bibliothecaireService.pages$;

  constructor(private bibliothecaireService: BibliothecaireService) {}


}
