import { Component, OnInit } from '@angular/core';
import { BibliothecaireService } from '../../api/bibliothecaire.service';
import { Router } from '@angular/router';
import { Bibliothecaire } from '../../models/bibliothecaire';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-referent',
  templateUrl: './referent.page.html',
  styleUrls: ['./referent.page.scss'],
})
export class ReferentPage implements OnInit {

  Nom = '';
  Prenom = '';
  menuReferent = [
    {url:'/rechercher', title: 'Rechercher'}
  ];
  addForm: FormGroup;
  message: '';
  idBibliothecaire: number;

  bibliothecaires: Observable<Array<Bibliothecaire>>;

  constructor(private bibliothecaireService: BibliothecaireService,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder ) { }

  ngOnInit() {
      this.addForm = this.formBuilder.group({
        Id: [''],
        Nom: [''],
        Prenom: [''],
        Email: ['', [Validators.required, Validators.email]],
        Password: [''],
        Referent: ['false'],
        Statut: ['Actif']
      });
      this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
      this.bibliothecaireService.obtenirUnBibliothecaire(this.idBibliothecaire).subscribe(
        (data) => {
          this.Nom = data.Nom;
          this.Prenom = data.Prenom;
      });
      this.bibliothecaires = this.bibliothecaireService.refreshBibliothecaires.pipe(switchMap(_ => this.bibliothecaireService.obtenirTousLesBibliothecaires()));
  }

  supprimerBibliothecaire(id) {
    this.alertCtrl.create({
      header: "Confirmation",
      message: "Confirmez-vous la suppression ?",
      buttons: [
        {
          text: "Non",
          role: "Cancel"
        },
        {
          text: "Oui",
          handler: () => {
            this.bibliothecaireService.supprimerUnBibliothecaire(id).subscribe(
              () => {  },
              (err) => console.log(err),
              () => { setTimeout(() => {this.bibliothecaireService.refreshBibliothecaires.next(true)}, 100);  }
            );
          }
      }]
    })
    .then(alertElement => {
      alertElement.present();
    });
  }

  ajouterBibliothecaire() {
    this.bibliothecaireService.ajouterUnBibliothecaire(this.addForm.value).subscribe((data) => {
      if(data.message) {
        this.message = data.message;
      } else {
        this.bibliothecaireService.refreshBibliothecaires.next(true);
      }
    });
    this.addForm.reset();
    this.addForm.patchValue({
      Referent: 'false',
      Statut: 'Actif'
    });
  }

}
