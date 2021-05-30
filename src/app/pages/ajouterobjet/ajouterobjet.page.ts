import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';
import { ObjetService } from '../../api/objet.service';

@Component({
  selector: 'app-ajouterobjet',
  templateUrl: './ajouterobjet.page.html',
  styleUrls: ['./ajouterobjet.page.scss'],
})
export class AjouterobjetPage implements OnInit {

  dateLimiteFormatee = '';
  addForm: FormGroup;
  Nom = '';
  Prenom = '';
  message = '';
  messageInfo = '';
  idBibliothecaire: number;
  ecrit = true;


  constructor(private formBuilder: FormBuilder, private bibliothecaireService: BibliothecaireService, private objetService: ObjetService) { }

  ngOnInit() {
    this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.bibliothecaireService.obtenirUnBibliothecaire(this.idBibliothecaire).subscribe(
      (data) => {
        this.Nom = data.Nom;
        this.Prenom = data.Prenom;
      }
    );
    const idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.addForm = this.formBuilder.group({
      id: [0],
      Titre: [''],
      AuteurScenariste: [''],
      Realisateur: [''],
      Scenariste: [''],
      Genre: [''],
      Annee: [''],
      Duree: [''],
      Description: [''],
      Edition: [''],
      Pages: [''],
      Dessinateur: [''],
      Artiste: [''],
      Zone: [''],
      Travee: [''],
      EtagereBac: [''],
      Code3C: [''],
      Etat: [''],
      Reserve: [''],
      TypeObjet: [''],
      empruntId: [''],
      CreePar: [idBibliothecaire],
      MisAJourPar: [idBibliothecaire]
    });


  }

  ajouterObjet() {
    this.objetService.ajouterUnObjet(this.addForm.value).subscribe((id) => {
      this.message = "Objet enregistré";
    });
    this.addForm.patchValue({
      Titre: '',
      AuteurScenariste: '',
      Realisateur: '',
      Scenariste: '',
      Genre: '',
      Annee: '',
      Duree: '',
      Description: '',
      Edition: '',
      Pages: '',
      Dessinateur: '',
      Artiste: '',
      Zone: '',
      Travee: '',
      EtagereBac: '',
      CodeC: ''
    });

  }



}
