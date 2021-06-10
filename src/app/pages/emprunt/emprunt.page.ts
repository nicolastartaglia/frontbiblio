import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';
import { ObjetService } from '../../api/objet.service';
import { Objet } from 'src/app/models/objet';
import { AbonneService } from '../../api/abonne.service';
import { Abonne } from 'src/app/models/abonne';
import { EmpruntService } from 'src/app/api/emprunt.service';
import { Observable } from 'rxjs';

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
  initEmprunt: boolean;
  envoyerRecu: boolean;

  abonne = new Abonne(0, '', '', '', '', '', '', '', 0, '', 0, 0);

  emprunts: Array<ObjetEmprunte> = [];

  constructor(private formBuilder: FormBuilder,
              private bibliothecaireService: BibliothecaireService,
              private abonneService: AbonneService,
              private empruntService: EmpruntService,
              private objetService: ObjetService) { }

  ngOnInit() {
    this.initEmprunt = true;
    this.envoyerRecu = false;
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
      idObjet: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  afficheAbonne(){
    this.messageAlerte1 = '';
    this.messageInfo = '';
    this.abonneService.obtenirUnAbonne(this.idForm.value.id).subscribe((data) => {
      if (!data.message) {
        this.idValide = true;
        this.abonne = data;
        console.log(this.abonne);
        this.amende = this.abonne.Amende;
        this.abonneService.obtenirLeDernierEmpruntDunAbonne(this.abonne.id).subscribe(
          (data) => {
            if(!data.message){
              this.idValide = false;
              this.messageAlerte1 = "Cet abonné n'a pas retourné son dernier emprunt";
            } else {
              // pas d'emprunt en cours
              this.initEmprunt = false;
              const dateJour = new Date();
              const dateLimiteAbonnement = new Date(this.abonne.DateLimiteAbonnement);
              const dateEmpruntPossible = new Date(this.abonne.DateEmpruntPossible);
              const pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
              this.dateLimiteAffichee = this.abonne.DateLimiteAbonnement.substring(0, 10).replace(pattern, '$3-$2-$1');
              this.dateEmpruntPossibleAffichee = this.abonne.DateEmpruntPossible.substring(0, 10).replace(pattern, '$3-$2-$1');
              if(dateEmpruntPossible > dateJour){
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
    this.initEmprunt = true;
    let tabObjetId = new Array();
    for (let emprunt of this.emprunts){
      tabObjetId.push(emprunt.id);
    }
    this.empruntService.emprunterDesObjets({
      dureeEmprunt: this.empruntService.dureeMaximumEnJoursEmprunt,
      bibliothecaireId: this.idBibliothecaire,
      abonneId: this.abonne.id,
      objetsEmpruntes: tabObjetId
    }).subscribe(
      (data) => {
        this.idValide = false;
        this.initEmprunt = true;
        this.envoyerRecu = false;
        this.emprunts.splice(0,this.emprunts.length)
        this.nbEmprunts = 0;
        this.messageInfo = data.message;
      }
    );
  }

  solderAmende(){
    this.abonneService.payerLAmende(this.abonne.id).subscribe(
      (data) => {
        this.amende = data.Amende;
        console.log(this.amende);
      }
    );
  }

  ajouterObjet() {
    this.messageAlerte2 = '';
    console.log(this.nbEmprunts);
    if (this.nbEmprunts < this.empruntService.nombreMaxObjetsEmpruntes) {
      this.objetService.obtenirUnObjetAEmprunter({
        objetId: this.addForm.value.idObjet,
        abonneId: this.abonne.id,
        dureeReservation: this.empruntService.dureeMaxReservation
      }).subscribe(
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
          } else {
            this.messageAlerte2 = data.message;
          }
        }
      );
    } else {
      this.messageAlerte2 = "Nombre maximum d'objets empruntés atteint! "
    }
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
    this.nbEmprunts = this.nbEmprunts - 1;
  }

  reSelectionnerIdAbonne() {
    this.idValide = false;
    this.initEmprunt = true;
    this.emprunts.splice(0,this.emprunts.length)
    this.nbEmprunts = 0;
    this.idForm.patchValue({
      id: ''
    });
  }


}
