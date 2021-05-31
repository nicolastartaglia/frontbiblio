import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';
import { AbonneService } from '../../api/abonne.service';

@Component({
  selector: 'app-ajouterabonne',
  templateUrl: './ajouterabonne.page.html',
  styleUrls: ['./ajouterabonne.page.scss'],
})
export class AjouterabonnePage implements OnInit {

  dateLimiteFormatee = '';
  addForm: FormGroup;
  Nom = '';
  Prenom = '';
  message = '';
  messageInfo = '';
  idBibliothecaire: number;


  constructor(private formBuilder: FormBuilder, private bibliothecaireService: BibliothecaireService, private abonneService: AbonneService) { }

  ngOnInit() {
    this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.bibliothecaireService.obtenirUnBibliothecaire(this.idBibliothecaire).subscribe(
      (data) => {
        this.Nom = data.Nom;
        this.Prenom = data.Prenom;
      }
    );
    const dateJour = new Date();
    const dateLimite = new Date(dateJour.setDate(dateJour.getDate() + 365));
    this.dateLimiteFormatee = dateLimite.toLocaleDateString();
    const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    const datedb = this.dateLimiteFormatee.replace(pattern, '$3-$2-$1');
    const idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.addForm = this.formBuilder.group({
      id: [0],
      Prenom: ['', [Validators.required]],
      Nom: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Rue: [''],
      CodePostal: [''],
      Ville: [''],
      DateLimiteAbonnement: [datedb],
      Amende: [0],
      DateEmpruntPossible: [datedb],
      CreePar: [idBibliothecaire],
      MisAJourPar: [idBibliothecaire]
    });


  }

  ajouterAbonne() {
    this.abonneService.ajouterUnAbonne(this.addForm.value).subscribe((id) => {
      this.message = "Abonné enregistré et identifié avec le numéro: "+id;
    });
    this.addForm.patchValue({
      Nom: '',
      Prenom: '',
      Email: '',
      Rue: '',
      CodePostal: '',
      Ville: ''
    });

  }



}
