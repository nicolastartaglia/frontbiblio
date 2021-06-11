import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ObjetService } from '../../api/objet.service';
import { Objet } from 'src/app/models/objet';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rechercher',
  templateUrl: './rechercher.page.html',
  styleUrls: ['./rechercher.page.scss'],
})
export class RechercherPage implements OnInit {

  rechercheForm: FormGroup;
  objets: Observable<Array<Objet>>;
  messageInfo = '';
  idObjet = '';

  constructor(private formBuilder: FormBuilder,
              private objetService: ObjetService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.rechercheForm = this.formBuilder.group({
      TitreRecherche: [this.objetService.TitreRecherche],
      AuteurArtisteRecherche: [this.objetService.AuteurArtisteRecherche],
      TypeObjetRecherche: [this.objetService.TypeObjetRecherche]
    });
    this.idObjet = this.route.snapshot.paramMap.get('idObjet');
    if (this.idObjet != null) {
      this.messageInfo = "Modifications enregistrées sur l'objet n°"+this.idObjet;
      this.objets = this.objetService.refreshObjets.pipe(switchMap(_ => this.objetService.obtenirQuelquesObjets(this.rechercheForm.value)));
    }
  }

  rechercheObjet() {
    this.messageInfo = '';
    this.objetService.TitreRecherche = this.rechercheForm.value.TitreRecherche;
    this.objetService.AuteurArtisteRecherche = this.rechercheForm.value.AuteurArtisteRecherche;
    this.objetService.TypeObjetRecherche = this.rechercheForm.value.TypeObjetRecherche;
    this.objets = this.objetService.refreshObjets.pipe(switchMap(_ => this.objetService.obtenirQuelquesObjets(this.rechercheForm.value)));
    
  }

}
