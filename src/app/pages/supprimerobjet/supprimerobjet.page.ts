import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';
import { Objet } from 'src/app/models/objet';
import { ObjetService } from '../../api/objet.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-supprimerobjet',
  templateUrl: './supprimerobjet.page.html',
  styleUrls: ['./supprimerobjet.page.scss'],
})
export class SupprimerobjetPage implements OnInit {

  suppForm: FormGroup;
  Nom = '';
  Prenom = '';
  messageAlerte = '';
  messageInfo = '';
  objet = new Objet(0, '', '', '', '', '', '', 0, '', '', 0, '', '', '', '', '', '', '', '', new Date(), 'ecrit', 0, 0, 0, 0);
  idValide = false;
  idBibliothecaire: number;
  typeObjet = "ecrit";

  constructor(private formBuilder: FormBuilder,
              private bibliothecaireService: BibliothecaireService,
              private objetService: ObjetService,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.bibliothecaireService.obtenirUnBibliothecaire(this.idBibliothecaire).subscribe(
      (data) => {
        this.Nom = data.Nom;
        this.Prenom = data.Prenom;
      }
    );
    this.suppForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
    this.messageInfo = '';
    this.messageAlerte = '';
  }

  afficheObjet() {
    this.objetService.obtenirUnObjet(this.suppForm.value.id).subscribe((data) => {
      if (!data.message) {
        this.objet = data;
        this.typeObjet = data.typeObjet;
        this.messageAlerte = '';
        this.idValide = true;
      } else {
        this.messageInfo = '';
        this.messageAlerte = data.message;
      }
    });
    this.suppForm.patchValue({
      id: ''
    });
  }

  supprimerObjet() {
    if (this.objet.id !== 0) {
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
              this.messageAlerte = '';
              this.objetService.supprimerUnObjet(this.objet.id).subscribe((message) => {
                console.log(message);
                this.messageInfo = message;
                console.log(this.messageInfo);
                this.idValide = false;
                this.typeObjet = "ecrit";
                this.objet = new Objet(0, '', '', '', '', '', '', 0, '', '', 0, '', '', '', '', '', '', '', '', new Date(), 'ecrit', 0, 0, 0, 0);
              });
              this.suppForm.patchValue({
                id: ''
              });
            }
          }]
      })
      .then(alertElement => {
        alertElement.present();
      });

    }
  }
}
