import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';
import { AbonneService } from '../../api/abonne.service';
import { Abonne } from 'src/app/models/abonne';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-abonne-details',
  templateUrl: './abonne-details.page.html',
  styleUrls: ['./abonne-details.page.scss'],
})
export class AbonneDetailsPage implements OnInit {

  dateLimiteFormatee = '';
  modifForm: FormGroup;
  Nom = '';
  Prenom = '';
  messageAlerte = '';
  messageInfo = '';
  idBibliothecaire: number;
  idAbonne: number;
  abonne = new Abonne(0, '', '', '', '', '', '', '', 0, '', 0, 0);
  formulaireModifie: any;

constructor(
    private bibliothecaireService: BibliothecaireService,
    private routeActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private abonneService: AbonneService
  ) { }

  ngOnInit() {
    console.log("ngOninit details");
    this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.bibliothecaireService.obtenirUnBibliothecaire(this.idBibliothecaire).subscribe(
      (data) => {
        this.Nom = data.Nom;
        this.Prenom = data.Prenom;
      }
    );
    this.idAbonne = this.routeActive.snapshot.params['idAbonne'];
    this.modifForm = this.formBuilder.group({
      id: [this.idAbonne],
      Prenom: ['', [Validators.required]],
      Nom: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Rue: [''],
      CodePostal: [''],
      Ville: [''],
      DateLimiteAbonnement: [''],
      Amende: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      PenaliteNbJours: [''],
      CreePar: ['1'],
      MisAJourPar: [this.idBibliothecaire]
    });
    this.abonneService.obtenirUnAbonne(this.idAbonne).subscribe((data) => {

      this.abonne = data;
      console.log("données détails récupérées");
      console.log(this.abonne);
      const pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
      const dateLimiteAffichee = this.abonne.DateLimiteAbonnement.substring(0, 10).replace(pattern, '$3-$2-$1');
      const dateEmpruntAffichee = this.abonne.DateEmpruntPossible.substring(0, 10).replace(pattern, '$3-$2-$1');
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
        DateEmpruntPossible: dateEmpruntAffichee,
        CreePar: this.abonne.CreePar,
        MisAJourPar: this.abonne.MisAJourPar
      });
    });
  }

  modifierAbonne() {
    const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    const dateDb = this.modifForm.value.DateLimiteAbonnement.replace(pattern, '$3-$2-$1') + this.abonne.DateLimiteAbonnement.substring(10, 24);
    this.formulaireModifie = {...this.modifForm.value};
    const dateJour = new Date();
    const dateSaisie = new Date(dateDb);
    if (dateSaisie < dateJour) {
      this.messageAlerte = "La date saisie ne peut être antérieure à la date d'aujourd'hui";
    } else {
      this.abonneService.mettreAjourUnAbonne(this.abonne.id, this.formulaireModifie).subscribe(() => {
        this.abonneService.refreshAbonnes.next(true);
        this.router.navigate(['/rechercheabonne', this.idAbonne]);
      });

    }
  }
}
