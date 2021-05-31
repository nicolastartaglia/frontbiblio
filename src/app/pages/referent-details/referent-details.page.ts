import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';


@Component({
  selector: 'app-referent-details',
  templateUrl: './referent-details.page.html',
  styleUrls: ['./referent-details.page.scss'],
})
export class ReferentDetailsPage implements OnInit {

  editForm: FormGroup;
  unBibliothecaire$: any;
  id: any;
  statut: '';
  referent: '';
  Nom = '';
  Prenom = '';

  constructor(
    private bibliothecaireService: BibliothecaireService,
    private routeActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      Id: [''],
      Nom: [''],
      Prenom: [''],
      Email: ['', [Validators.required, Validators.email]],
      Password: [''],
      Referent: [''],
      Statut: ['']
    });
    this.id = this.routeActive.snapshot.params['idReferent'];
    this.unBibliothecaire$ = this.bibliothecaireService.obtenirUnBibliothecaire(this.id)
      .subscribe(
        data => {
          this.Nom = data.Nom;
          this.Prenom = data.Prenom;
          this.statut = data.Statut;
          this.referent = data.Referent;
          this.editForm.patchValue({
            Id: data.Id,
            Nom: data.Nom,
            Prenom: data.Prenom,
            Email: data.Email,
            Referent: data.Referent,
            Statut: data.Statut
          });
        }

      );
  }

  mettreAjourBibliothecaire() {
    this.bibliothecaireService.mettreAjourUnBibliothecaire(this.id, this.editForm.value).subscribe(() => {
      this.bibliothecaireService.refreshBibliothecaires.next(true)
      this.router.navigate(['referent']);
    });
  }

  retour() {
    this.router.navigate(['referent'])
  }

}
