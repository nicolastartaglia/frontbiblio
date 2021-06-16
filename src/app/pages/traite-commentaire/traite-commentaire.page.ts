import { Component, OnInit } from '@angular/core';
import { Commentaire } from '../../models/commentaire';
import { CommentaireService } from '../../api/commentaire.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';

@Component({
  selector: 'app-traite-commentaire',
  templateUrl: './traite-commentaire.page.html',
  styleUrls: ['./traite-commentaire.page.scss'],
})
export class TraiteCommentairePage implements OnInit {

  nbCommentaires: number;
  Nom = '';
  Prenom = '';
  commentaires: Observable<Array<Commentaire>>;
  messageInfo = '';
  datesCommentairesAffichees: Object;
  idBibliothecaire: number;
  initCommentaire: boolean;

  constructor(private commentaireService: CommentaireService,
    private bibliothecaireService: BibliothecaireService) { }

  ngOnInit() {
    this.initCommentaire = false;
    this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.bibliothecaireService.obtenirUnBibliothecaire(this.idBibliothecaire).subscribe(
      (data) => {
        this.Nom = data.Nom;
        this.Prenom = data.Prenom;
      }
    );
    this.commentaires = this.commentaireService.refreshCommentaires.pipe(switchMap(_ => this.commentaireService.obtenirTousLesCommentairesEnAttente()));
    this.commentaires.subscribe((commentaires) => {
      this.reactualiserListeCommentaires(commentaires);
    });
  }

  reactualiserListeCommentaires(commentaires){
    if(commentaires.length > 0){
      this.initCommentaire = true;
      const pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
      this.datesCommentairesAffichees = new Object();
      commentaires.forEach(commentaire => {
        const dateCommentaireAffichee = commentaire.DateCommentaire.substring(0, 10).replace(pattern, '$3-$2-$1');
        const obj = {[commentaire.id]: dateCommentaireAffichee };
        Object.assign( this.datesCommentairesAffichees, obj);
      });
    }
  }

  approuverCommentaire(id: number) {
    this.initCommentaire = false;
    this.commentaireService.approuverCommentaire(id).subscribe((data) => {
      this.commentaireService.refreshCommentaires.next(true);
      this.commentaires.subscribe((commentaires) => {
        this.reactualiserListeCommentaires(commentaires);
      });
    });
  }

  supprimerCommentaire(id: number) {
    this.initCommentaire = false;
    this.commentaireService.supprimerCommentaire(id).subscribe((data) => {
      this.commentaireService.refreshCommentaires.next(true);
      this.commentaires.subscribe((commentaires) => {
        this.reactualiserListeCommentaires(commentaires);
      });
    });
  }

}
