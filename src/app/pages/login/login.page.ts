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
  menuReferent = [
    {url:'/rechercher', title: 'Rechercher'},
    {url:'/logout', title: 'Se déconnecter'}
  ];


  constructor(public formBuilder: FormBuilder,
              private bibliothecaireService: BibliothecaireService,
              private router: Router) { }


  ngOnInit() {
    this.connexion = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
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
          () => {
            if (this.bibliothecaireService.estConnecte()) {
              if (this.bibliothecaireService.estReferent()) {
                this.bibliothecaireService.pages$.next(this.menuReferent);
                this.router.navigateByUrl('/referent');
              } else {
                this.router.navigateByUrl('/bibliothecaire');
              }
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
