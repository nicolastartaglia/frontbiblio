import { Component, OnInit } from '@angular/core';
import { BibliothecaireService } from '../../api/bibliothecaire.service';
import { Animation, AnimationController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mediatheque',
  templateUrl: './mediatheque.page.html',
  styleUrls: ['./mediatheque.page.scss'],
})
export class MediathequePage implements OnInit {

  Nom = '';
  Prenom = '';
  idBibliothecaire: number;

  menuMediatheque = [
    {url:'/rechercheobjet', title: 'Rechercher un objet'},
    {url:'/ajouterobjet', title: 'Ajouter un objet'},
    {url:'/modifierobjet', title: 'Modifier un objet'},
    {url:'/supprimerobjet', title: 'Supprimer un objet'},
    {url:'/objetperdu', title: 'Objets perdus'},
    {url:'/objetabime', title: 'Objets abîmés'},
    {url:'/bibliothecaire', title: 'Retour au menu principal'}
  ];
  menuBibliothecaire = [
    {url:'/emprunt', title: 'Enregistrer un emprunt'},
    {url:'/retour', title: 'Enregistrer un retour'},
    {url:'/abonne', title: 'Gestion des abonnés'},
    {url:'/commentaire', title: 'Commentaires à traiter'},
    {url:'/mediatheque', title: 'Gestion de la médiathèque'}
  ];

  constructor(private bibliothecaireService: BibliothecaireService,
              private animationCtrl: AnimationController,
              private router: Router,
              private menuCtrl: MenuController) { }

  ngOnInit() {
    this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.bibliothecaireService.obtenirUnBibliothecaire(this.idBibliothecaire).subscribe(
      (data) => {
        this.Nom = data.Nom;
        this.Prenom = data.Prenom;
      }
    );
    this.bibliothecaireService.seDeconnecte$.next({affiche: true});
    this.bibliothecaireService.pages$.next(this.menuMediatheque);
    this.animerPage();
  }

  animerPage() {
    const animation1: Animation = this.animationCtrl.create()
    .addElement(document.querySelector('#it1'))
    .duration(500)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(10vh)')
    .fromTo('opacity', '0.2', '1');

    const animation2: Animation = this.animationCtrl.create()
    .addElement(document.querySelector('#it2'))
    .duration(550)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(10vh)')
    .fromTo('opacity', '0.2', '1');

    const animation3: Animation = this.animationCtrl.create()
    .addElement(document.querySelector('#it3'))
    .duration(650)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(10vh)')
    .fromTo('opacity', '0.2', '1');

    const animation4: Animation = this.animationCtrl.create()
    .addElement(document.querySelector('#it4'))
    .duration(800)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(10vh)')
    .fromTo('opacity', '0.2', '1');

    const animation5: Animation = this.animationCtrl.create()
    .addElement(document.querySelector('#it5'))
    .duration(1000)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(10vh)')
    .fromTo('opacity', '0.2', '1');

    const animation6: Animation = this.animationCtrl.create()
    .addElement(document.querySelector('#it6'))
    .duration(1250)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(10vh)')
    .fromTo('opacity', '0.2', '1');

    const animation7: Animation = this.animationCtrl.create()
    .addElement(document.querySelector('#it7'))
    .duration(1550)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(10vh)')
    .fromTo('opacity', '0.2', '1');


    animation1.play();
    animation2.play();
    animation3.play();
    animation4.play();
    animation5.play();
    animation6.play();
    animation7.play();

  }

  revenir() {
    this.bibliothecaireService.seDeconnecte$.next({affiche: true});
    this.bibliothecaireService.pages$.next(this.menuBibliothecaire);
    this.menuCtrl.close();
    this.router.navigateByUrl('/bibliothecaire');
  }

}
