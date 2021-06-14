import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BibliothecaireService } from '../api/bibliothecaire.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanActivate {

  constructor(private bibliothecaireService: BibliothecaireService, private router: Router) {}

  canActivate() {
    if (!this.bibliothecaireService.estConnecte()) {
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }
}
