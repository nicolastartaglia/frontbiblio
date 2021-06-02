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
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

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
  empruntPossible = true;
  dateLimiteDepassee = false;
  nbEmprunts = 0;
  dateLimiteAffichee = '';
  dateEmpruntPossibleAffichee = '';

  abonne = new Abonne(0, '', '', '', '', '', '', '', 0, '', 0, 0);
 // emprunt = new Emprunt(0, new Date(), '');

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
    this.idForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  afficheAbonne(){
    this.abonneService.obtenirUnAbonne(this.idForm.value.id).subscribe((data) => {
      if (!data.message) {
        this.idValide = true;
        this.abonne = data;
        console.log(this.abonne);
        this.abonneService.obtenirLeDernierEmpruntDunAbonne(this.abonne.id).subscribe(
          (data) => {
            if(!data.message){
            //  console.log(data);
              this.messageAlerte1 = "L'abonné n'a pas retourné son dernier emprunt";
            } else {
              // pas d'emprunt en cours
              const dateJour = new Date();
              const dateLimiteAbonnement = new Date(this.abonne.DateLimiteAbonnement);
              const dateEmpruntPossible = new Date(this.abonne.DateEmpruntPossible);
              const pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
              this.dateLimiteAffichee = this.abonne.DateLimiteAbonnement.substring(0, 10).replace(pattern, '$3-$2-$1');
              this.dateEmpruntPossibleAffichee = this.abonne.DateEmpruntPossible.substring(0, 10).replace(pattern, '$3-$2-$1');
              if(dateEmpruntPossible > dateJour){
                this.empruntPossible = false;

              } else {
                if(dateJour > dateLimiteAbonnement){
                  this.dateLimiteDepassee = true;
                }
              }
            }
          }
        )
      } else {
        this.idValide = false;
        this.messageAlerte1 = data.message;
      }
    });
  }

  enregistrerEmprunt(){


  }

  solderAmende(){

  }

  ajouterObjet() {

  }

  renouvelerAbonnement() {

  }


}
