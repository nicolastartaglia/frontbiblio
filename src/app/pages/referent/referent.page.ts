import { Component, OnInit } from '@angular/core';
import { BibliothecaireService } from '../../api/bibliothecaire.service';
import { Router } from '@angular/router';
import { Bibliothecaire } from '../../models/bibliothecaire';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-referent',
  templateUrl: './referent.page.html',
  styleUrls: ['./referent.page.scss'],
})
export class ReferentPage implements OnInit {

  Nom = '';
  Prenom = '';
  menuReferent = [
    {url:'/rechercher', title: 'Rechercher'}
  ];
  addForm: FormGroup;
  message: '';
  idBibliothecaire: number;


  bibliothecaires: Observable<Array<Bibliothecaire>>;

  constructor(private bibliothecaireService: BibliothecaireService, private router: Router, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    if (this.bibliothecaireService.estConnecte()) {
      console.log("headers");
      console.log(this.bibliothecaireService.headers);
      if (!this.bibliothecaireService.estReferent()) {
        this.router.navigateByUrl('');
      }
      this.addForm = this.formBuilder.group({
        Id: [''],
        Nom: [''],
        Prenom: [''],
        Email: ['', [Validators.required, Validators.email]],
        Password: [''],
        Referent: ['false'],
        Statut: ['Actif']
      });
      this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
      this.bibliothecaireService.obtenirUnBibliothecaire(this.idBibliothecaire).subscribe(
        (data) => {
          this.Nom = data.Nom;
          this.Prenom = data.Prenom;
      });
      // this.bibliothecaireService.pages$.next(this.menuReferent);
      // this.bibliothecaireService.seDeconnecte$.next({affiche: true});
      this.bibliothecaires = this.bibliothecaireService.refreshBibliothecaires.pipe(switchMap(_ => this.bibliothecaireService.obtenirTousLesBibliothecaires()));
    } else {
      this.router.navigateByUrl('');
    }
  }

  supprimerBibliothecaire(id) {
      this.bibliothecaireService.supprimerUnBibliothecaire(id).subscribe(
        () => {},
        (err) => console.log(err),
        () => { console.log("terminé");  this.bibliothecaireService.refreshBibliothecaires.next(true);  }
      );
  }

  ajouterBibliothecaire() {
    this.bibliothecaireService.ajouterUnBibliothecaire(this.addForm.value).subscribe((data) => {
      if(data.message) {
        this.message = data.message;
      } else {
        this.bibliothecaireService.refreshBibliothecaires.next(true);
      }
    });
    this.addForm.reset();
    this.addForm.patchValue({
      Referent: 'false',
      Statut: 'Actif'
    });

  }

}
