import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  { path: 'affiliation', data: {breadcrumb: 'Affiliation'}, loadChildren: () => import('./affiliation/affiliation.module').then(m => m.AffiliationModule) },
  { path: 'immatriculation', data: {breadcrumb: 'Immatriculation'}, loadChildren: () => import('./immatriculation/immatriculation.module').then(m => m.ImmatriculationModule) },
  { path: 'declaration', data: {breadcrumb: 'Déclaration'}, loadChildren: () => import('./declaration/declaration.module').then(m => m.DeclarationModule) },
  { path: 'cotisation', data: {breadcrumb: 'Cotisation'}, loadChildren: () => import('./cotisation/cotisation.module').then(m => m.CotisationModule) },
  { path: 'carte', data: {breadcrumb: 'Carte'}, loadChildren: () => import('./carte/carte.module').then(m => m.CarteModule) },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatistiqueRoutingModule { }
