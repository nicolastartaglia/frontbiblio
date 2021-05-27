import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajouterabonne',
  templateUrl: './ajouterabonne.page.html',
  styleUrls: ['./ajouterabonne.page.scss'],
})
export class AjouterabonnePage implements OnInit {

  dateLimite: Date;
  dateLimiteFormatee = ''
  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dateLimite = new Date();
    this.dateLimiteFormatee = this.dateLimite.toLocaleDateString();
    this.addForm = this.formBuilder.group({
      Nom: [''],
      Prenom: [''],
      Email: ['', [Validators.required, Validators.email]],
      Rue: [''],
      CodePostal: [''],
      Ville: ['']
    });


  }

  ajouterAbonne() {

  }

}
