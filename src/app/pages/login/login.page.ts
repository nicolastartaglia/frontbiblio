import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BibliothecaireService } from '../../api/bibliothecaire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  connexion: FormGroup;
  isSubmitted = false;
  seConnecter$: any;
  message = '';
  menuReferent = [
    {url:'/rechercher', title: 'Rechercher'}
  ];

  menuBibliothecaire = [
    {url:'/emprunt', title: 'Enregistrer un emprunt'},
    {url:'/retour', title: 'Enregistrer un retour'},
    {url:'/abonne', title: 'Gestion des abonnés'},
    {url:'/commentaire', title: 'Commentaires à traiter'},
    {url:'/mediatheque', title: 'Gestion de la médiathèque'}
  ];


  constructor(public formBuilder: FormBuilder,
              private bibliothecaireService: BibliothecaireService,
              private router: Router) { }


  ngOnInit() {
    this.connexion = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(2)]]
    });
    console.log("ngOnInit login page");
  }

  get errorControl() {
    return this.connexion.controls;
  }

  seConnecter() {
    this.isSubmitted = true;
    if (!this.connexion.valid) {
      console.log('Tous les champs sont requis')
      return false;
    } else {
      console.log(this.connexion.value);

      this.seConnecter$ = this.bibliothecaireService.seConnecter(this.connexion.value)
        .subscribe(
          (data) => {
            if (this.bibliothecaireService.estConnecte()) {
              if (this.bibliothecaireService.estReferent()) {
                this.bibliothecaireService.pages$.next(this.menuReferent);
                this.bibliothecaireService.seDeconnecte$.next({affiche: true});
                this.router.navigateByUrl('/referent');
              } else {
                this.bibliothecaireService.pages$.next(this.menuBibliothecaire);
                this.bibliothecaireService.seDeconnecte$.next({affiche: true});
                this.router.navigateByUrl('/bibliothecaire');
              }
            } else {
              this.message = data.message;
            }
          }
          ,
          (err) => {
            // this.message = 'Vos informations de connexion sont inexactes ou vous n\'avez pas confirmé votre inscription.';
            console.log(err);
          }
        );
    }
  }

}
