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
  },  {
    path: 'emprunt',
    loadChildren: () => import('./pages/emprunt/emprunt.module').then( m => m.EmpruntPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    // RouterModule.forRoot(routes, { onSameUrlNavigation: 'ignore' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
