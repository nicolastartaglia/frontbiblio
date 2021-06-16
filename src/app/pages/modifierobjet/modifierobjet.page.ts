import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';
import { ObjetService } from '../../api/objet.service';
import { Objet } from 'src/app/models/objet';

@Component({
  selector: 'app-modifierobjet',
  templateUrl: './modifierobjet.page.html',
  styleUrls: ['./modifierobjet.page.scss'],
})
export class ModifierobjetPage implements OnInit {

  modifForm: FormGroup;
  idForm: FormGroup;
  Nom = '';
  Prenom = '';
  messageAlerte = '';
  messageInfo = '';
  idBibliothecaire: number;
  objet = new Objet(0, '', '', '', '', '', '', 0, '', '', 0, '', '', '', '', '', '', '', '', new Date(), 'ecrit', 0, 0, 0, 0);
  idValide = false;

  constructor(private formBuilder: FormBuilder, private bibliothecaireService: BibliothecaireService, private objetService: ObjetService) { }

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
      Titre: [''],
      AuteurScenariste: [''],
      Realisateur: [''],
      Scenariste: [''],
      Genre: [''],
      Annee: [''],
      Duree: [0],
      Description: [''],
      Edition: [''],
      Pages: [0],
      Dessinateur: [''],
      Artiste: [''],
      Zone: [''],
      Travee: [''],
      EtagereBac: [''],
      Code3C: [''],
      Etat: [''],
      Reserve: [''],
      DateReservation: [new Date("2020-01-01")],
      TypeObjet: ['ecrit'],
      empruntId: [1],
      ReservePar: [1],
      CreePar: [this.idBibliothecaire],
      MisAJourPar: [this.idBibliothecaire]
    });

  }

  afficheObjet() {
    this.messageAlerte = '';
    this.messageInfo = '';
    this.objetService.obtenirUnObjet(this.idForm.value.id).subscribe((data) => {
      if (!data.message) {
        this.idValide = true;
        this.objet = data;
        this.modifForm.patchValue({
          id: this.objet.id,
          Titre: this.objet.Titre,
          AuteurScenariste: this.objet.AuteurScenariste,
          Realisateur: this.objet.Realisateur,
          Scenariste: this.objet.Scenariste,
          Genre: this.objet.Genre,
          Annee: this.objet.Annee,
          Duree: this.objet.Duree,
          Description: this.objet.Description,
          Edition: this.objet.Edition,
          Pages: this.objet.Pages,
          Dessinateur: this.objet.Dessinateur,
          Artiste: this.objet.Artiste,
          Zone: this.objet.Zone,
          Travee: this.objet.Travee,
          EtagereBac: this.objet.EtagereBac,
          Code3C: this.objet.Code3C,
          Etat: this.objet.Etat,
          Reserve: this.objet.Reserve,
          DateReservation: this.objet.DateReservation,
          TypeObjet: this.objet.TypeObjet,
          empruntId: this.objet.empruntId,
          ReservePar: this.objet.ReservePar,
          CreePar: this.objet.CreePar,
          MisAJourPar: this.objet.MisAJourPar
        });
      } else {
        this.idValide = false;
        this.messageAlerte = data.message;
      }
    });
    this.idForm.patchValue({
      id: ''
    });
  }

  modifierObjet() {
    this.idValide = false;
    this.objetService.mettreAjourUnObjet(this.objet.id, this.modifForm.value).subscribe(() => {
      this.messageInfo = "Les modifications sur cet objet ont été enregistrées";
      this.modifForm.patchValue({
      Titre: '',
      AuteurScenariste: '',
      Realisateur: '',
      Scenariste: '',
      Genre: '',
      Annee: '',
      Duree: 0,
      Description: '',
      Edition: '',
      Pages: 0,
      Dessinateur: '',
      Artiste: '',
      Zone: '',
      Travee: '',
      EtagereBac: '',
      Code3C: '',
      Etat: '',
      Reserve: '',
      DateReservation: [new Date("2020-01-01")],
      TypeObjet: ['ecrit'],
      empruntId: [1],
      ReservePar: [1],
      CreePar: [this.idBibliothecaire],
      MisAJourPar: [this.idBibliothecaire]
      });
    });
  }
}

