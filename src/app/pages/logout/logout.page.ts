import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BibliothecaireService } from '../../api/bibliothecaire.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  changeRoute: boolean = false;

  constructor(private bibliothecaireService: BibliothecaireService, private router: Router) { }

  ngOnInit() {
    console.log("toto");
    this.bibliothecaireService.seDeconnecter();
    this.router.navigateByUrl('');
    console.log("ngOnInit logout page");
  }

  

}
