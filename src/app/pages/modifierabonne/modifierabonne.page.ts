import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';
import { AbonneService } from '../../api/abonne.service';
import { Abonne } from 'src/app/models/abonne';

@Component({
  selector: 'app-modifierabonne',
  templateUrl: './modifierabonne.page.html',
  styleUrls: ['./modifierabonne.page.scss'],
})
export class ModifierabonnePage implements OnInit {

  dateLimiteFormatee = '';
  modifForm: FormGroup;
  idForm: FormGroup;
  Nom = '';
  Prenom = '';
  messageAlerte = '';
  messageInfo = '';
  idBibliothecaire: number;
  abonne = new Abonne(0, '', '', '', '', '', '', '', 0, 0, 0, 0);

  constructor(private formBuilder: FormBuilder, private bibliothecaireService: BibliothecaireService, private abonneService: AbonneService) { }

  ngOnInit() {
    this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.bibliothecaireService.obtenirUnBibliothecaire(this.idBibliothecaire).subscribe(
      (data) => {
        this.Nom = data.Nom;
        this.Prenom = data.Prenom;
      }
    );
    this.idForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
    this.modifForm = this.formBuilder.group({
      id: [0],
      Prenom: ['', [Validators.required]],
      Nom: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Rue: [''],
      CodePostal: [''],
      Ville: [''],
      DateLimiteAbonnement: [''],
      Amende: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      PenaliteNbJours: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      CreePar: ['1', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      MisAJourPar: ['1', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });

  }

  afficheAbonne() {
    this.messageAlerte = '';
    this.messageInfo = '';
    this.abonneService.obtenirUnAbonne(this.idForm.value.id).subscribe((data) => {
      if (!data.message) {
        this.abonne = data;
        const pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
        const dateAffichee = this.abonne.DateLimiteAbonnement.substring(0, 10).replace(pattern, '$3-$2-$1');
        this.modifForm.patchValue({
          id: this.abonne.id,
          Prenom: this.abonne.Prenom,
          Nom: this.abonne.Nom,
          Email: this.abonne.Email,
          Rue: this.abonne.Rue,
          CodePostal: this.abonne.CodePostal,
          Ville: this.abonne.Ville,
          DateLimiteAbonnement: dateAffichee,
          Amende: this.abonne.Amende,
          PenaliteNbJours: this.abonne.PenaliteNbJours,
          CreePar: this.abonne.CreePar,
          MisAJourPar: this.abonne.MisAJourPar
        });
      } else {
        this.messageAlerte = data.message;
      }
    });
    this.idForm.patchValue({
      id: ''
    });
  }

  modifierAbonne() {
    const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    const dateDb = this.modifForm.value.DateLimiteAbonnement.replace(pattern, '$3-$2-$1') + this.abonne.DateLimiteAbonnement.substring(10, 24);
    this.modifForm.patchValue({
      DateLimiteAbonnement: dateDb
    });
    const dateJour = new Date();
    const dateSaisie = new Date(dateDb);
    if (dateSaisie < dateJour) {
      this.messageAlerte = "La date saisie ne peut être antérieure à la date d'aujourd'hui";
    } else {
      this.messageAlerte = '';
      this.abonneService.mettreAjourUnAbonne(this.abonne.id, this.modifForm.value).subscribe(() => {
        this.messageInfo = "Les modifications sur cet abonné ont été enregistrées";
        this.modifForm.patchValue({
          id: 0,
          Prenom: '',
          Nom: '',
          Email: '',
          Rue: '',
          CodePostal: '',
          Ville: '',
          DateLimiteAbonnement: '',
          Amende: 0,
          PenaliteNbJours: 0,
          CreePar: 1,
          MisAJourPar: 1
        });
      });
    }


  }

}
