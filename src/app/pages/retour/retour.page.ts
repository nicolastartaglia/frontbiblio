import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';
import { ObjetService } from '../../api/objet.service';
import { Objet } from 'src/app/models/objet';
import { AbonneService } from '../../api/abonne.service';
import { Abonne } from 'src/app/models/abonne';
import { EmpruntService } from 'src/app/api/emprunt.service';
import { Observable } from 'rxjs';


interface ObjetRetourne {
  id: number;
  Etat: string;
}

@Component({
  selector: 'app-retour',
  templateUrl: './retour.page.html',
  styleUrls: ['./retour.page.scss'],
})
export class RetourPage implements OnInit {


  idForm: FormGroup;
  addForm: FormGroup;
  initRetour: boolean;
  idBibliothecaire: number;
  Nom = '';
  Prenom = '';
  messageAlerte1 = '';
  messageAlerte2 = '';
  messageInfo = '';
  idValide: boolean;
  abonne = new Abonne(0, '', '', '', '', '', '', '', 0, '', 0, 0);
  dateEmpruntAffichee = '';
  dateRetourAffichee = '';
  dateLimiteAffichee = '';
  retardRetour: number;
  nbEmprunts: number;
  nbRetours: number;
  emprunts: Array<Objet> = [];
  retours: Array<ObjetRetourne> = [];
  retourValide: boolean;
  empruntId: number;


  constructor(private formBuilder: FormBuilder,
    private bibliothecaireService: BibliothecaireService,
    private abonneService: AbonneService,
    private empruntService: EmpruntService,
    private objetService: ObjetService) { }

  ngOnInit() {
    this.initRetour = true;
    this.retourValide = false;
    this.nbRetours = 0;
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

  afficheAbonne() {
    this.messageAlerte1 = '';
    this.messageInfo = '';
    this.abonneService.obtenirUnAbonne(this.idForm.value.id).subscribe((abonne) => {
      if (!abonne.message) {
        this.idValide = true;
        this.abonne = abonne;
        this.abonneService.obtenirLeDernierEmpruntDunAbonne(this.abonne.id).subscribe(
          (emprunt) => {
            if (emprunt.message) {
              this.idValide = false;
              this.messageAlerte1 = emprunt.message;
            } else {
              // retour d'emprunt
              this.empruntId = emprunt.id;
              this.initRetour = false;
              const pattern1 = /(\d{4})\-(\d{2})\-(\d{2})/;
              //  this.dateLimiteAffichee = data.DateRetourLimite.substring(0, 10).replace(pattern, '$3-$2-$1');
              this.dateLimiteAffichee = emprunt.DateRetourLimite.substring(0, 10).replace(pattern1, '$3-$2-$1');
              console.log(emprunt.DateRetourLimite);
              console.log(this.dateLimiteAffichee);
              this.dateEmpruntAffichee = emprunt.DateEmprunt.substring(0, 10).replace(pattern1, '$3-$2-$1');
              const pattern2 = /(\d{2})\-(\d{2})\-(\d{4})/;
              this.dateRetourAffichee = (new Date()).toLocaleDateString().substring(0, 10).replace(pattern2, '$3-$2-$1');
              const dateJour = (new Date()).valueOf();
              const dateRetourLimite = (new Date(emprunt.DateRetourLimite)).valueOf();
              const retard = Math.floor((dateJour - dateRetourLimite) / (1000 * 60 * 60 * 24));
              this.retardRetour = retard <= 0 ? 0 : retard;
              this.messageAlerte2 = '';
              console.log("emprunt id");
              console.log(emprunt.id);
              this.empruntService.obtenirLaListeDesObjetsEmpruntes(emprunt.id).subscribe(
                (listeObjets) => {
                  if (listeObjets.message) {
                    this.messageAlerte2 = listeObjets.message;
                  } else {
                    this.emprunts = listeObjets;
                    this.nbEmprunts = listeObjets.length;
                    for (let emprunt of this.emprunts) {
                      this.retours.push({ id: emprunt.id, Etat: "correct" });
                    }
                  }
                }
              );
            }
          }
        )
      } else {
        this.idValide = false;
        this.messageAlerte1 = abonne.message;
      }
    });
  }

  solderAmende() {
    this.abonne.Amende = 0;
  }

  reCalculerAmende(objetId: number) {
    this.abonne.Amende = 0;
    for (let retour of this.retours) {
      if (retour.Etat == "abime") {
        this.abonne.Amende = this.abonne.Amende + this.empruntService.amendeObjetAbime;
      } else if (retour.Etat == "perdu") {
        this.abonne.Amende = this.abonne.Amende + this.empruntService.amendeObjetPerdu;
      }
    }
  }

  evalAmende($event) {
    const identifiantBoutonRadio = $event.srcElement.id;
    const objetId = parseInt(identifiantBoutonRadio.split('etat')[1]);
    const etatObjet = $event.srcElement.value;
    for (let retour of this.retours) {
      if (retour.id == objetId) {
        if(etatObjet == "perdu"){
          const styleAffichageObjetRetourne = document.getElementById("ok" + objetId).style.display;
          if (styleAffichageObjetRetourne != "block"){
            document.getElementById("ok" + objetId).style.display = "block";
            document.getElementById("wrong" + objetId).style.display = "none";
            this.nbRetours = this.nbRetours + 1;
          }
        }
        if(retour.Etat == "perdu"){
          document.getElementById("ok" + objetId).style.display = "none";
          document.getElementById("wrong" + objetId).style.display = "block";
          this.nbRetours = this.nbRetours - 1;
        }
        retour.Etat = etatObjet;
        break;
      }
    }
    this.reCalculerAmende(objetId);
  }

  ajouterObjet() {
    this.messageAlerte2='';
    let idTrouve = false;
    let idObjet = 0;
    for (let retour of this.retours) {
      if (retour.id == this.addForm.value.idObjet) {
        idTrouve = true;
        idObjet = retour.id;
        this.nbRetours = this.nbRetours + 1;
        break;
      }
    }
    if (!idTrouve) {
      this.messageAlerte2 = "Cet objet ne fait pas partie des objets empruntés";
    } else {
      document.getElementById("ok" + idObjet).style.display = "block";
      document.getElementById("wrong" + idObjet).style.display = "none";
      this.addForm.patchValue({
        idObjet: ''
      });
      if(this.nbRetours == this.nbEmprunts){
        this.retourValide = true;
      }
    }
  }

  reSelectionnerIdAbonne() {
    this.idValide = false;
    this.initRetour = true;
    this.retourValide = false;
    this.nbRetours = 0;
    this.retours.splice(0,this.retours.length);
  }

  enregistrerRetour() {
    this.empruntService.retournerDesObjets({
      bibliothecaireId: this.idBibliothecaire,
      abonneId: this.abonne.id,
      Amende: this.abonne.Amende,
      empruntId: this.empruntId,
      objetsRetournes: this.retours
    }).subscribe(
      (data) => {
        this.idValide = false;
        this.initRetour = true;
        this.retourValide = false;
        this.retours.splice(0,this.retours.length)
        this.nbRetours = 0;
        this.messageInfo = data.message;
      }
    );
  }
}
