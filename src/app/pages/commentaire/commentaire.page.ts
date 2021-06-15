import { Component, OnInit } from '@angular/core';
import { Commentaire } from '../../models/commentaire';
import { CommentaireService } from '../../api/commentaire.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.page.html',
  styleUrls: ['./commentaire.page.scss'],
})
export class CommentairePage implements OnInit {

  commentaires: Array<Commentaire>;
  idObjet: number;
  nbCommentaires = 0;


  constructor(private commentaireService: CommentaireService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.idObjet = this.route.snapshot.params['idObjet'];
    this.commentaireService.obtenirTousLesCommentairesApprouvesSurUnObjet(this.idObjet).subscribe((data) => {
      this.commentaires = data;
      this.nbCommentaires = this.commentaires.length;
      console.log(data);

    });
  }



}
