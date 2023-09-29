import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdministrationComponent } from './dashboard-administration.component';

const routes: Routes = [
  { path: '', data: {breadcrumb: 'Tableau de bord'}, component: DashboardAdministrationComponent },
  { path: 'account/infos-user', loadChildren: () => import('../account/infos-user/infos-user.module').then(m => m.InfosUserModule) },
  { path: 'communes', data: {breadcrumb: 'Gestion des communes'}, loadChildren: () => import('./parametre/commune/commune.module').then(m => m.CommuneModule) },
  { path: 'privileges', data: {breadcrumb: 'Gestion des privilèges'}, loadChildren: () => import('./privilege/privilege.module').then(m => m.PrivilegeModule) },
  { path: 'profils', data: {breadcrumb: 'Gestion des profils'}, loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule) },
  { path: 'services', data: {breadcrumb: 'Gestion des services'}, loadChildren: () => import('./app-services/app-services.module').then(m => m.AppServicesModule) },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AdministrationRoutingModule { }

