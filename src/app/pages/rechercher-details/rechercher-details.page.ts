import { Component, OnInit } from '@angular/core';
import { Objet } from 'src/app/models/objet';
import { ObjetService } from '../../api/objet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rechercher-details',
  templateUrl: './rechercher-details.page.html',
  styleUrls: ['./rechercher-details.page.scss'],
})
export class RechercherDetailsPage implements OnInit {

  idObjet: number;
  objet = new Objet(0, '', '', '', '', '', '', 0, '', '', 0, '', '', '', '', '', '', '', '', new Date(), 'ecrit', 0, 0, 0, 0);

  constructor(private route: ActivatedRoute,
              private objetService: ObjetService) { }

  ngOnInit() {
    this.idObjet = this.route.snapshot.params['idObjet'];
    this.objetService.obtenirUnObjet(this.idObjet).subscribe((data) => {
      this.objet = data;
      console.log(this.objet);
    });
  }

  reserverObjet() {

  }

}
