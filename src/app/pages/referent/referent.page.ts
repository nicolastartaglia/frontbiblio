import { Component, OnInit } from '@angular/core';
import { BibliothecaireService } from '../../api/bibliothecaire.service';
import { Router } from '@angular/router';
import { Bibliothecaire } from '../../models/bibliothecaire';

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

  listeBibliothecaire$: any;

  bibliothecaires: Array<Bibliothecaire> = new Array<Bibliothecaire>();

  constructor(private bibliothecaireService: BibliothecaireService, private router: Router) { }

  ngOnInit() {
    if (this.bibliothecaireService.estConnecte()) {
      if (!this.bibliothecaireService.estReferent()) {
        this.router.navigateByUrl('');
      }
      this.Nom = this.bibliothecaireService.recupererDonneesJeton().Nom;
      this.Prenom = this.bibliothecaireService.recupererDonneesJeton().Prenom;
      this.bibliothecaireService.pages$.next(this.menuReferent);
      this.listeBibliothecaire$ = this.bibliothecaireService.obtenirTousLesBibliothecaires()
        .subscribe(
          (data) => {
            this.bibliothecaires = data;
          },
          (err) => console.log(err)
        );
    } else {
      this.router.navigateByUrl('');
    }
    console.log("ngOnInit référent page");

  }

  supprimerBibliothecaire(id: number) {

  }

}
