import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjetService } from '../../api/objet.service';
import { Objet } from 'src/app/models/objet';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { EmpruntService } from 'src/app/api/emprunt.service';

@Component({
  selector: 'app-rechercher',
  templateUrl: './rechercher.page.html',
  styleUrls: ['./rechercher.page.scss'],
})
export class RechercherPage implements OnInit {

  rechercheForm: FormGroup;
  reserverForm: FormGroup;
  objets: Observable<Array<Objet>>;
  messageInfo = '';
  idObjet = '';
  dateJour: number;

  constructor(private formBuilder: FormBuilder,
              private objetService: ObjetService,
              private route: ActivatedRoute,
              private empruntService: EmpruntService) { }

  ngOnInit() {
    this.rechercheForm = this.formBuilder.group({
      TitreRecherche: [this.objetService.TitreRecherche],
      AuteurArtisteRecherche: [this.objetService.AuteurArtisteRecherche],
      TypeObjetRecherche: [this.objetService.TypeObjetRecherche]
    });
    this.reserverForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
    this.idObjet = this.route.snapshot.paramMap.get('idObjet');
    if (this.idObjet != null) {
      this.messageInfo = "Modifications enregistrées sur l'objet n°"+this.idObjet;
      this.objets = this.objetService.refreshObjets.pipe(switchMap(_ => this.objetService.obtenirQuelquesObjets(this.rechercheForm.value)));
    }
    this.dateJour = (new Date()).valueOf();
  }

  rechercheObjet() {
    this.messageInfo = '';
    this.objetService.TitreRecherche = this.rechercheForm.value.TitreRecherche;
    this.objetService.AuteurArtisteRecherche = this.rechercheForm.value.AuteurArtisteRecherche;
    this.objetService.TypeObjetRecherche = this.rechercheForm.value.TypeObjetRecherche;
    this.objets = this.objetService.refreshObjets.pipe(switchMap(_ => this.objetService.obtenirQuelquesObjets(this.rechercheForm.value)));

  }

  indisponbibleALaReservation(objet: Objet): boolean{
    const dateReservation = (new Date(objet.DateReservation)).valueOf();
    const dureeReservation = Math.floor((this.dateJour - dateReservation) / (1000 * 60 * 60 * 24));
    if(dureeReservation > this.empruntService.dureeMaxReservation){
      return false;
    }
    return true;
  }

  reserverObjet(id: number) {
    this.objetService.reserverUnObjet({objetId: id, ReservePar: this.reserverForm.value.id}).subscribe((data) => {
      console.log(data);
     // this.router.navigate(['/rechercher']);
      document.getElementById("inputForm"+id).style.display = "none";
      document.getElementById("choixForm"+id).style.display = "none";
      this.objetService.refreshObjets.next(true);
    });

  }

  ajouterCommentaire() {

  }

  afficherFormulaire(id: number){
    document.getElementById("inputForm"+id).style.display = "block";
    document.getElementById("choixForm"+id).style.display = "block";
  }

  cacherFormulaire(id: number){
    document.getElementById("inputForm"+id).style.display = "none";
    document.getElementById("choixForm"+id).style.display = "none";
  }

}
