import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';
import { ObjetService } from '../../api/objet.service';
import { Objet } from 'src/app/models/objet';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-objet-details',
  templateUrl: './objet-details.page.html',
  styleUrls: ['./objet-details.page.scss'],
})
export class ObjetDetailsPage implements OnInit {

  modifForm: FormGroup;
  Nom = '';
  Prenom = '';
  messageAlerte = '';
  messageInfo = '';
  idBibliothecaire: number;
  idObjet: number;
  objet = new Objet(0, '', '', '', '', '', '', 0, '', '', 0, '', '', '', '', '', '', '', '', new Date(), 'ecrit', 0, 0, 0, 0);
  formulaireModifie: any;

  constructor(
    private bibliothecaireService: BibliothecaireService,
    private routeActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private objetService: ObjetService
  ) { }

  ngOnInit() {
    this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.bibliothecaireService.obtenirUnBibliothecaire(this.idBibliothecaire).subscribe(
      (data) => {
        this.Nom = data.Nom;
        this.Prenom = data.Prenom;
      }
    );
    this.idObjet = this.routeActive.snapshot.params['idObjet'];
    this.modifForm = this.formBuilder.group({
      id: [this.idObjet],
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
    this.objetService.obtenirUnObjet(this.idObjet).subscribe((data) => {
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
        MisAJourPar: this.idBibliothecaire
      });
    });
  }

  modifierObjet() {
    // this.formulaireModifie = {...this.modifForm.value};
    this.objetService.mettreAjourUnObjet(this.objet.id, this.modifForm.value).subscribe(() => {
      this.objetService.refreshObjets.next(true);
      this.router.navigate(['/rechercheobjet', this.idObjet]);
    });
  }
}
