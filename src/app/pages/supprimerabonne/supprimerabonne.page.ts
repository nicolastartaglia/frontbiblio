import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';
import { Abonne } from 'src/app/models/abonne';
import { AbonneService } from '../../api/abonne.service';
@Component({
  selector: 'app-supprimerabonne',
  templateUrl: './supprimerabonne.page.html',
  styleUrls: ['./supprimerabonne.page.scss'],
})
export class SupprimerabonnePage implements OnInit {

  suppForm: FormGroup;
  Nom = '';
  Prenom = '';
  messageAlerte = '';
  messageInfo = '';
  abonne = new Abonne(0, '', '', '', '', '', '', '', 0, 0, 0, 0);
  suppressionImpossible = true;
  idBibliothecaire: number;

  constructor(private formBuilder: FormBuilder, private bibliothecaireService: BibliothecaireService, private abonneService: AbonneService) { }

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

  afficheAbonne() {
    if (this.suppForm.value.id !== '') {
      this.abonneService.obtenirUnAbonne(this.suppForm.value.id).subscribe((data) => {
        if (!data.message){
          this.abonne = data;
          this.messageAlerte = '';
          this.suppressionImpossible = false;
        } else {
          this.messageInfo = '';
          this.messageAlerte = data.message;
        }
      });
      this.suppForm.patchValue({
        id: ''
      });
    }

  }

  supprimerAbonne() {
    if (this.abonne.id !== 0){
      this.messageAlerte = '';
      this.abonneService.supprimerUnAbonne(this.abonne.id).subscribe((message) => {
          this.messageInfo = message;
          this.suppressionImpossible = true;
          this.abonne = new Abonne(0, '', '', '', '', '', '', '', 0, 0, 0, 0);
      });
      this.suppForm.patchValue({
        id: ''
      });
    }

  }


}
