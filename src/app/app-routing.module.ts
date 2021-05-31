import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'rechercher',
    loadChildren: () => import('./pages/rechercher/rechercher.module').then( m => m.RechercherPageModule)
  },
  {
    path: 'referent',
    loadChildren: () => import('./pages/referent/referent.module').then( m => m.ReferentPageModule)
  },
  {
    path: 'bibliothecaire',
    loadChildren: () => import('./pages/bibliothecaire/bibliothecaire.module').then( m => m.BibliothecairePageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'referent-details/:idReferent',
    loadChildren: () => import('./pages/referent-details/referent-details.module').then( m => m.ReferentDetailsPageModule)
  },
  {
    path: 'emprunt',
    loadChildren: () => import('./pages/emprunt/emprunt.module').then( m => m.EmpruntPageModule)
  },
  {
    path: 'retour',
    loadChildren: () => import('./pages/retour/retour.module').then( m => m.RetourPageModule)
  },
  {
    path: 'abonne',
    loadChildren: () => import('./pages/abonne/abonne.module').then( m => m.AbonnePageModule)
  },
  {
    path: 'commentaire',
    loadChildren: () => import('./pages/commentaire/commentaire.module').then( m => m.CommentairePageModule)
  },
  {
    path: 'mediatheque',
    loadChildren: () => import('./pages/mediatheque/mediatheque.module').then( m => m.MediathequePageModule)
  },
  {
    path: 'rechercheabonne',
    loadChildren: () => import('./pages/rechercheabonne/rechercheabonne.module').then( m => m.RechercheabonnePageModule)
  },
  {
    path: 'rechercheabonne/:idAbonne',
    loadChildren: () => import('./pages/rechercheabonne/rechercheabonne.module').then( m => m.RechercheabonnePageModule)
  },
  {
    path: 'ajouterabonne',
    loadChildren: () => import('./pages/ajouterabonne/ajouterabonne.module').then( m => m.AjouterabonnePageModule)
  },
  {
    path: 'modifierabonne',
    loadChildren: () => import('./pages/modifierabonne/modifierabonne.module').then( m => m.ModifierabonnePageModule)
  },
  {
    path: 'supprimerabonne',
    loadChildren: () => import('./pages/supprimerabonne/supprimerabonne.module').then( m => m.SupprimerabonnePageModule)
  },
  {
    path: 'abonne-details/:idAbonne',
    loadChildren: () => import('./pages/abonne-details/abonne-details.module').then( m => m.AbonneDetailsPageModule)
  },
  {
    path: 'rechercheobjet',
    loadChildren: () => import('./pages/rechercheobjet/rechercheobjet.module').then( m => m.RechercheobjetPageModule)
  },
  {
    path: 'rechercheobjet/:idObjet',
    loadChildren: () => import('./pages/rechercheobjet/rechercheobjet.module').then( m => m.RechercheobjetPageModule)
  },
  {
    path: 'ajouterobjet',
    loadChildren: () => import('./pages/ajouterobjet/ajouterobjet.module').then( m => m.AjouterobjetPageModule)
  },
  {
    path: 'modifierobjet',
    loadChildren: () => import('./pages/modifierobjet/modifierobjet.module').then( m => m.ModifierobjetPageModule)
  },
  {
    path: 'supprimerobjet',
    loadChildren: () => import('./pages/supprimerobjet/supprimerobjet.module').then( m => m.SupprimerobjetPageModule)
  },
  {
    path: 'objetperdu',
    loadChildren: () => import('./pages/objetperdu/objetperdu.module').then( m => m.ObjetperduPageModule)
  },
  {
    path: 'objetabime',
    loadChildren: () => import('./pages/objetabime/objetabime.module').then( m => m.ObjetabimePageModule)
  },
  {
    path: 'objet-details/:idObjet',
    loadChildren: () => import('./pages/objet-details/objet-details.module').then( m => m.ObjetDetailsPageModule)
  }




];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
