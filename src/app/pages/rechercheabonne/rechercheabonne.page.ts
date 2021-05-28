import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';
import { AbonneService } from '../../api/abonne.service';
import { Abonne } from 'src/app/models/abonne';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

  constructor(private formBuilder: FormBuilder, private bibliothecaireService: BibliothecaireService, private abonneService: AbonneService) { }

  ngOnInit() {
    this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.bibliothecaireService.obtenirUnBibliothecaire(this.idBibliothecaire).subscribe(
      (data) => {
        this.Nom = data.Nom;
        this.Prenom = data.Prenom;
      }
    );
    this.rechercheForm = this.formBuilder.group({
      Prenom: [''],
      Nom: [''],
      Email: ['', Validators.email],
    });

  }

  rechercheAbonne() {
    console.log(this.rechercheForm.value);
    this.abonnes = this.abonneService.refreshAbonnes.pipe(switchMap(_ => this.abonneService.obtenirQuelquesAbonnes(this.rechercheForm.value)));

  }

  supprimerAbonne(id) {


  }
}
