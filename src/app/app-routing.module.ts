import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { DashboardPublicComponent } from './public/dashboard-public.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { Authority } from './shared/constants/authority.constants';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [

    {
        path: '', component: DashboardPublicComponent,
        children: [
            { path: '', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./account/login/login.module').then(m => m.LoginModule) },
            { path: 'user', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
        ]
    },
    {
       // path: 'admin', component: AppLayoutComponent, canActivate: [AuthGuard],
        path: 'admin', component: AppLayoutComponent,
        //  data: {
        //     authorities: [Authority.USER,Authority.ADMIN
        //     ]
        // },
         children: [
            { path: '', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
        ]
      //  path: 'admin', component: AppLayoutComponent,
        // data: {
        // authorities: [Authority.USER,Authority.ADMIN,
        //     Authority.ADD_PROFILE,Authority.VIEW_PROFILE,Authority.DELETE_PROFILE,Authority.ADD_USER,
        //     Authority.VIEW_USER,Authority.ADD_ACTIVITE,Authority.EDIT_ACTIVITE,Authority.VIEW_ACTIVITE,
        //     Authority.DELETE_ACTIVITE,Authority.ADD_ARRONDISSEMENT,Authority.EDIT_ARRONDISSEMENT,
        //     Authority.VIEW_ARRONDISSEMENT,Authority.DELETE_ARRONDISSEMENT,Authority.ADD_ASSURE,
        //     Authority.EDIT_ASSURE,Authority.VIEW_ASSURE,Authority.DELETE_ASSURE,Authority.PRINT_RECEP_ASSURE,
        //     Authority.VALID_REJET_ASSURE,Authority.ADD_CARTE,Authority.EDIT_CARTE,
        //    Authority.VIEW_CARTE,Authority.DELETE_CARTE,Authority.GEN_CARTE,
        //    Authority.PRINT_CARTE,Authority.ADD_COMMUNE,Authority.VIEW_COMMUNE,
        //    Authority.EDIT_COMMUNE,Authority.DELETE_COMMUNE,Authority.ADD_DECLARATION,Authority.EDIT_DECLARATION,
        //    Authority.VIEW_DECLARATION,Authority.DELETE_DECLARATION,Authority.ADD_DIVISION,Authority.EDIT_DIVISION,
        //    Authority.VIEW_DIVISION,Authority.DELETE_DIVISION,Authority.ADD_EMPLOI,Authority.EDIT_EMPLOI,
        //    Authority.VIEW_EMPLOI,Authority.DELETE_EMPLOI,Authority.ADD_EMPLOYEUR,Authority.EDIT_EMPLOYEUR,
        //    Authority.VALID_REJET_EMPLOYEUR,Authority.VIEW_EMPLOYEUR,Authority.DELETE_EMPLOYEUR,Authority.PRINT_EMPLOYEUR,
        //    Authority.ADD_ES,Authority.EDIT_ES,Authority.VIEW_ES,Authority.DELETE_ES,
        //    Authority.ADD_FJ,Authority.EDIT_FJ,Authority.VIEW_FJ,Authority.DELETE_FJ,
        //    Authority.ADD_GROUPE,Authority.EDIT_GROUPE,Authority.VIEW_GROUPE,Authority.DELETE_GROUPE,
        //    Authority.ADD_PAYS,Authority.EDIT_PAYS,Authority.VIEW_PAYS,Authority.DELETE_PAYS,Authority.ADD_PHOTO,
        //    Authority.EDIT_PHOTO,Authority.VIEW_PHOTO,Authority.DELETE_PHOTO,Authority.ADD_PIECE,
        //    Authority.EDIT_PIECE,Authority.VIEW_PIECE,Authority.DELETE_PIECE,Authority.ADD_PROFESSION,
        //    Authority.EDIT_PROFESSION,Authority.VIEW_PROFESSION,Authority.DELETE_PROFESSION,
        //    Authority.ADD_PROVINCE,Authority.EDIT_PROVINCE,Authority.VIEW_PROVINCE,
        //    Authority.DELETE_PROVINCE,Authority.ADD_REGION,Authority.EDIT_REGION,Authority.DELETE_REGION,
        //    Authority.VIEW_REGION,Authority.VIEW_REPORT,Authority.ADD_SECT_VILL,
        //    Authority.EDIT_SECT_VILL,Authority.VIEW_SECT_VILL,Authority.DELETE_SECT_VILL,
        //    Authority.ADD_SECTION,Authority.EDIT_SECTION,Authority.VIEW_SECTION,
        //    Authority.DELETE_SECTION,Authority.ADD_SERVEUR,Authority.EDIT_SERVEUR,Authority.VIEW_SERVEUR,
        //    Authority.DELETE_SERVEUR,Authority.ADD_TFC,Authority.EDIT_TFC,Authority.VIEW_TFC,
        //    Authority.DELETE_TFC,Authority.ADD_TYPE_ASSURE,Authority.EDIT_TYPE_ASSURE,
        //    Authority.VIEW_TYPE_ASSURE,Authority.DELETE_TYPE_ASSURE,Authority.ADD_TYPE_EMPLOYEUR,
        //    Authority.EDIT_TYPE_EMPLOYEUR,Authority.VIEW_TYPE_EMPLOYEUR,Authority.DELETE_TYPE_EMPLOYEUR,
        //    Authority.ADD_TYPE_PIECE,Authority.EDIT_TYPE_PIECE,Authority.VIEW_TYPE_PIECE,
        //    Authority.DELETE_TYPE_PIECE,Authority.ADD_FINGER,Authority.EDIT_FINGER,Authority.VIEW_FINGER,
        //    Authority.ADD_BANQUE,Authority.EDIT_BANQUE,Authority.VIEW_BANQUE,Authority.DELETE_BANQUE,
        //    Authority.ADD_CAISSE,Authority.EDIT_CAISSE,Authority.VIEW_CAISSE,
        //    Authority.DELETE_CAISSE,Authority.ADD_TYPE_COTISATION,Authority.EDIT_TYPE_COTISATION,
        //    Authority.VIEW_TYPE_COTISATION,Authority.DELETE_TYPE_COTISATION,Authority.ADD_COTISATION,
        //    Authority.EDIT_COTISATION,Authority.VIEW_COTISATION,Authority.DELETE_COTISATION     
        // ],
        // },
        // children: [
        //     { path: '', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
        // ]
    },
    
    { path: 'notfound', loadChildren: () => import('./shared/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
