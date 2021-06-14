import { Component, OnInit } from '@angular/core';
import { Objet } from 'src/app/models/objet';
import { ObjetService } from '../../api/objet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpruntService } from '../../api/emprunt.service';

@Component({
  selector: 'app-rechercher-details',
  templateUrl: './rechercher-details.page.html',
  styleUrls: ['./rechercher-details.page.scss'],
})
export class RechercherDetailsPage implements OnInit {

  idObjet: number;
  abonne: number;
  reservationPossible: boolean;
  objet = new Objet(0, '', '', '', '', '', '', 0, '', '', 0, '', '', '', '', '', '', '', '', new Date(), 'ecrit', 0, 0, 0, 0);

  constructor(private route: ActivatedRoute,
              private objetService: ObjetService,
              private router: Router,
              private empruntService: EmpruntService) { }

  ngOnInit() {
    this.reservationPossible = false;
    this.idObjet = this.route.snapshot.params['idObjet'];
    this.objetService.obtenirUnObjet(this.idObjet).subscribe((data) => {
      this.objet = data;
      const dateJour = (new Date()).valueOf();
      const dateReservation = (new Date(this.objet.DateReservation)).valueOf();
      const dureeReservation = Math.floor((dateJour - dateReservation) / (1000 * 60 * 60 * 24));
      if(dureeReservation > this.empruntService.dureeMaxReservation){
        this.reservationPossible = true;
      }
      this.abonne = 1;
    });
  }

  

}
