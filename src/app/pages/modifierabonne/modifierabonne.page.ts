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
  messageAlerte1 = '';
  messageAlerte2 = '';
  messageInfo = '';
  idBibliothecaire: number;
  abonne = new Abonne(0, '', '', '', '', '', '', '', 0, '', 0, 0);
  idValide = false;

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
      DateEmpruntPossible: [''],
      CreePar: [1],
      MisAJourPar: [this.idBibliothecaire]
    });

  }

  afficheAbonne() {
    this.messageAlerte1 = '';
    this.messageInfo = '';
    this.abonneService.obtenirUnAbonne(this.idForm.value.id).subscribe((data) => {
      if (!data.message) {
        this.idValide = true;
        this.abonne = data;
        const pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
        const dateLimiteAffichee = this.abonne.DateLimiteAbonnement.substring(0, 10).replace(pattern, '$3-$2-$1');
        const dateEmpruntPossible = this.abonne.DateEmpruntPossible.substring(0, 10).replace(pattern, '$3-$2-$1');
        this.modifForm.patchValue({
          id: this.abonne.id,
          Prenom: this.abonne.Prenom,
          Nom: this.abonne.Nom,
          Email: this.abonne.Email,
          Rue: this.abonne.Rue,
          CodePostal: this.abonne.CodePostal,
          Ville: this.abonne.Ville,
          DateLimiteAbonnement: dateLimiteAffichee,
          Amende: this.abonne.Amende,
          DateEmpruntPossible: dateEmpruntPossible,
          CreePar: this.abonne.CreePar,
          MisAJourPar: this.abonne.MisAJourPar
        });
      } else {
        this.idValide = false;
        this.messageAlerte1 = data.message;
      }
    });
    this.idForm.patchValue({
      id: ''
    });
  }

  modifierAbonne() {
    const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    const dateDbLimiteAbonnement = this.modifForm.value.DateLimiteAbonnement.replace(pattern, '$3-$2-$1') + this.abonne.DateLimiteAbonnement.substring(10, 24);
    const dateDbEmpruntPossible = this.modifForm.value.DateEmpruntPossible.replace(pattern, '$3-$2-$1') + this.abonne.DateEmpruntPossible.substring(10, 24);
    const dateJour = new Date();
    const dateSaisie = new Date(dateDbLimiteAbonnement);
    if (dateSaisie < dateJour) {
      this.messageAlerte2 = "La date saisie ne peut être antérieure à la date d'aujourd'hui";
    } else {
      this.modifForm.patchValue({
        DateLimiteAbonnement: dateDbLimiteAbonnement,
        DateEmpruntPossible: dateDbEmpruntPossible
      });
      this.messageAlerte2 = '';
      this.idValide = false;
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
          DateEmpruntPossible: '',
          CreePar: 1,
          MisAJourPar: 1
        });
      });
    }


  }

}
