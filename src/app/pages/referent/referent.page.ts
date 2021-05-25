import { Component, OnInit } from '@angular/core';
import { BibliothecaireService } from '../../api/bibliothecaire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-referent',
  templateUrl: './referent.page.html',
  styleUrls: ['./referent.page.scss'],
})
export class ReferentPage implements OnInit {

  Nom = '';
  Prenom = '';
  menuReferent = [
    {url:'/rechercher', title: 'Rechercher'},
    {url:'/logout', title: 'Se déconnecter'}
  ];
  constructor(private bibliothecaireService: BibliothecaireService, private router: Router) { }

  ngOnInit() {
    if (this.bibliothecaireService.estConnecte()) {
      if (!this.bibliothecaireService.estReferent()) {
        this.router.navigateByUrl('/home');
      }
      this.Nom = this.bibliothecaireService.recupererDonneesJeton().Nom;
      this.Prenom = this.bibliothecaireService.recupererDonneesJeton().Prenom;
      this.bibliothecaireService.pages$.next(this.menuReferent);
    } else {
      this.router.navigateByUrl('/home');
    }
  }

}
