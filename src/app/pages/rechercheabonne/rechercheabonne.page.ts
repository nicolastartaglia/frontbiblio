import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';
import { AbonneService } from '../../api/abonne.service';
import { Abonne } from 'src/app/models/abonne';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rechercheabonne',
  templateUrl: './rechercheabonne.page.html',
  styleUrls: ['./rechercheabonne.page.scss'],
})
export class RechercheabonnePage implements OnInit {

  pasDeCritereDeRecherche = true;
  idBibliothecaire: number;
  Nom = '';
  Prenom = '';
  rechercheForm: FormGroup;
  abonnes: Observable<Array<Abonne>>;
  messageInfo = '';
  idAbonne = '';

  constructor(private formBuilder: FormBuilder,
              private bibliothecaireService: BibliothecaireService,
              private abonneService: AbonneService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    console.log("ngoninit recherche");

    this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.bibliothecaireService.obtenirUnBibliothecaire(this.idBibliothecaire).subscribe(
      (data) => {
        this.Nom = data.Nom;
        this.Prenom = data.Prenom;
      }
    );
    this.rechercheForm = this.formBuilder.group({
      Prenom: [this.abonneService.PrenomRecherche],
      Nom: [this.abonneService.NomRecherche],
      Email: [this.abonneService.EmailRecherche]
    });
    this.idAbonne = this.route.snapshot.paramMap.get('idAbonne');
    if (this.idAbonne != null) {
      console.log("valeurs de form");
      console.log(this.rechercheForm.value);
      console.log("liste réfarîchie");
      this.messageInfo = "Modifications enregistréessur l'abonné n°"+this.idAbonne;
      this.abonnes = this.abonneService.refreshAbonnes.pipe(switchMap(_ => this.abonneService.obtenirQuelquesAbonnes(this.rechercheForm.value)));
    }

  }

  rechercheAbonne() {
    this.messageInfo = '';
    this.abonneService.PrenomRecherche = this.rechercheForm.value.Prenom;
    this.abonneService.NomRecherche = this.rechercheForm.value.Nom;
    this.abonneService.EmailRecherche = this.rechercheForm.value.Email;
    this.abonnes = this.abonneService.refreshAbonnes.pipe(switchMap(_ => this.abonneService.obtenirQuelquesAbonnes(this.rechercheForm.value)));
    //console.log(this.abonnes);

  }

  supprimerAbonne(id) {
    this.abonneService.supprimerUnAbonne(id).subscribe(
      () => {},
      (err) => console.log(err),
      () => { setTimeout(() => {this.abonneService.refreshAbonnes.next(true)}, 100);  }
    );

  }
}
