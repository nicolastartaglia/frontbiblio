import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';
import { ObjetService } from '../../api/objet.service';
import { Objet } from 'src/app/models/objet';
import { AbonneService } from '../../api/abonne.service';
import { Abonne } from 'src/app/models/abonne';
import { Emprunt } from 'src/app/models/emprunt';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emprunt',
  templateUrl: './emprunt.page.html',
  styleUrls: ['./emprunt.page.scss'],
})
export class EmpruntPage implements OnInit {

  idBibliothecaire: number;
  Nom = '';
  Prenom = '';
  empruntForm: FormGroup;
  idForm: FormGroup;
  objets: Observable<Array<Objet>>;
  messageInfo = '';
  messageAlerte1 = '';
  messageAlerte2 = '';
  idObjet = '';
  idValide = false;

  abonne = new Abonne(0, '', '', '', '', '', '', '', 0, '', 0, 0);
  emprunt = new Emprunt(0, new Date(), '');

  constructor(private formBuilder: FormBuilder,
    private bibliothecaireService: BibliothecaireService,
    private abonneService: AbonneService,
    private objetService: ObjetService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.bibliothecaireService.obtenirUnBibliothecaire(this.idBibliothecaire).subscribe(
      (data) => {
        this.Nom = data.Nom;
        this.Prenom = data.Prenom;
      }
    );
    this.empruntForm = this.formBuilder.group({
      DateRetourLimite: [new Date("2020-01-01")],
      Statut: ['']
    });
  }

  enregistrerEmprunt(){
    this.messageAlerte1 = '';
    this.messageInfo = '';
    this.abonneService.obtenirUnAbonne(this.idForm.value.id).subscribe((data) => {
      if (!data.message) {
        this.idValide = true;
        this.abonne = data;
        const pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
        const dateLimiteAffichee = this.abonne.DateLimiteAbonnement.substring(0, 10).replace(pattern, '$3-$2-$1');
        const dateEmpruntPossibleAffichee = this.abonne.DateEmpruntPossible.substring(0, 10).replace(pattern, '$3-$2-$1');
        this.empruntForm.patchValue({
          id: this.abonne.id,
          Prenom: this.abonne.Prenom,
          Nom: this.abonne.Nom,
          DateLimiteAbonnementAffichee: dateLimiteAffichee,
          DateLimiteAbonnement: this.abonne.DateLimiteAbonnement,
          Amende: this.abonne.Amende,
          DateEmpruntPossible: this.abonne.DateEmpruntPossible,
          DateEmpruntPossibleAffichee: dateEmpruntPossibleAffichee

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

  solderAmende(){

  }

}
