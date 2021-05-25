import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { BibliothecaireService } from '../../api/bibliothecaire.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public menuHome = [
    { title: 'Rechercher', url: '/rechercher' },
    { title: 'Contact', url: '/contact'},
    { title: 'Se connecter', url: '/login'}
  ];

  constructor(private animationCtrl: AnimationController, private bibliothecaireService: BibliothecaireService) {}

  ngOnInit() {
    const animation1: Animation = this.animationCtrl.create()
    .addElement(document.querySelector('#it1'))
    .duration(800)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(30vh)')
    .fromTo('opacity', '0.2', '1');

    const animation2: Animation = this.animationCtrl.create()
    .addElement(document.querySelector('#it2'))
    .duration(850)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(30vh)')
    .fromTo('opacity', '0.2', '1');

    const animation3: Animation = this.animationCtrl.create()
    .addElement(document.querySelector('#it3'))
    .duration(950)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(30vh)')
    .fromTo('opacity', '0.2', '1');


    animation1.play();
    animation2.play();
    animation3.play();
    this.bibliothecaireService.pages$.next(this.menuHome);

  }



}
