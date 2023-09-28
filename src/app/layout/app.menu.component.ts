import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/service/auth.service';
import { MenuItem } from 'primeng/api';
import { Authority } from '../shared/constants/authority.constants';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: MenuItem[] = [];
    constructor(
        private authService: AuthenticationService
    ) { }

    ngOnInit() {
        this.model = [
            {
               // label: 'Dashboard',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Tableau de bord',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/admin']
                    },

                    {
                        label: 'Statistiques',
                        icon: 'pi pi-fw pi-chart-line',
                       // visible: this.authService.checkPermission([Authority.ADMIN], AuthenticationService.privileges),
                        items: [
                           
                        ]
                    },
                    {
                        label: 'Utilisateur',
                        icon: 'pi pi-lock',
                        //visible: this.authService.checkPermission([Authority.ADMIN, Authority.VIEW_USER], AuthenticationService.privileges),
                        items: [
                        ]
                    },
                    {
                        label: 'Paramètres',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                                    {
                                        label: 'Commune',
                                        icon: 'pi pi-fw pi-eye-slash',
                                        routerLink: ['/admin/communes']
                                    },

                                ]
                            },
                        ]
                    },

                ]
    }
}
