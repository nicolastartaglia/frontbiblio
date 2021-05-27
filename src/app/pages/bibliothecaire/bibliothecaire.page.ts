import { Component, OnInit } from '@angular/core';
import { BibliothecaireService } from '../../api/bibliothecaire.service';

@Component({
  selector: 'app-bibliothecaire',
  templateUrl: './bibliothecaire.page.html',
  styleUrls: ['./bibliothecaire.page.scss'],
})
export class BibliothecairePage implements OnInit {

  Nom = '';
  Prenom = '';
  idBibliothecaire: number;

  menuBibliothecaire = [
    {url:'/emprunt', title: 'Enregistrer un emprunt'},
    {url:'/retour', title: 'Enregistrer un retour'},
    {url:'/abonne', title: 'Gestion des abonnés'},
    {url:'/traitement', title: 'Commentaires à traiter'},
    {url:'/mediatheque', title: 'Gestion de la médiathèque'}
  ];

  constructor(private bibliothecaireService: BibliothecaireService) { }

  ngOnInit() {
    this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.bibliothecaireService.obtenirUnBibliothecaire(this.idBibliothecaire).subscribe(
      (data) => {
        this.Nom = data.Nom;
        this.Prenom = data.Prenom;
        console.log("bibliothecaire");
        console.log(data);
      }
    );
    this.bibliothecaireService.pages$.next(this.menuBibliothecaire);
    this.bibliothecaireService.seDeconnecte$.next({affiche: true});
  }

}
