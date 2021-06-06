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
import { ChangeDetectorRef } from '@angular/core';

interface ObjetEmprunte {
  id: string;
  Titre: string;
}
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
  amende: number;
  addForm: FormGroup;
  objetARetirer: number;
  objetDejaSelectionne: boolean;

  abonne = new Abonne(0, '', '', '', '', '', '', '', 0, '', 0, 0);
 // emprunt = new Emprunt(0, new Date(), '');

  emprunts: Array<ObjetEmprunte> = [];

  constructor(private formBuilder: FormBuilder,
    private bibliothecaireService: BibliothecaireService,
    private abonneService: AbonneService,
    private objetService: ObjetService,
    private route: ActivatedRoute,
    private cRef: ChangeDetectorRef) { }

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
    this.addForm = this.formBuilder.group({
      idObjet: ['', Validators.required]
    });
    console.log("taille tableau");
    console.log(this.emprunts.length);
  }

  afficheAbonne(){
    this.abonneService.obtenirUnAbonne(this.idForm.value.id).subscribe((data) => {
      if (!data.message) {
        this.idValide = true;
        this.abonne = data;
        console.log(this.abonne);
        this.amende = this.abonne.Amende;
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
              console.log(dateEmpruntPossible);
              console.log(dateJour);
              console.log("date limute affichee");
              console.log(this.dateLimiteAffichee);
              if(dateEmpruntPossible > dateJour){
                console.log("emprunt impossble");
                this.empruntPossible = false;

              } else {

              }
              if(dateJour > dateLimiteAbonnement){
                console.log("dépassée");
                this.dateLimiteDepassee = true;
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
    this.abonneService.payerLAmende(this.abonne.id).subscribe(
      (data) => {
        this.amende = data.Amende;
        console.log(this.amende);

     //   this.cRef.detectChanges();
      }
    );
  }

  ajouterObjet() {
    this.messageAlerte2 = '';
    this.objetService.obtenirUnObjet(this.addForm.value.idObjet).subscribe(
      (data) => {
        if(!data.message){
          console.log(data);
          this.objetDejaSelectionne = false;
          for (let emprunt of this.emprunts){
            if (emprunt.id == data.id){
              this.objetDejaSelectionne = true;
              break;
            }
          }
          if(!this.objetDejaSelectionne){
            this.emprunts.push({id: data.id, Titre: data.Titre });
            this.nbEmprunts = this.nbEmprunts + 1;
          } else {
            this.messageAlerte2 = "Objet déjà pris en compte"
          }


          this.addForm.patchValue({
            idObjet: ''
          });

        }
      }
    );
  }

  renouvelerAbonnement() {
    this.abonneService.renouvelerAbonnement(this.abonne.id).subscribe(
      (data) => {
         console.log("donnéés bd abonnement renouvelé");
         console.log(data);
         const pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
         this.dateLimiteAffichee = data.DateLimiteAbonnement.substring(0, 10).replace(pattern, '$3-$2-$1');
         this.dateLimiteDepassee = false;
         console.log("date limite dépassée");
         console.log(this.dateLimiteAffichee);
       //  this.cRef.detectChanges();
      }
    )
  }

  supprimerUnObjetEmprunte(id) {
    for (let [i,emprunt] of this.emprunts.entries()){
      if (emprunt.id == id){
        this.objetARetirer = i;
        break;
      }
    }
    this.emprunts.splice(this.objetARetirer, 1);

  }


}
