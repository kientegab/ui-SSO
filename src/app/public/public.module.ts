import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { AnimateEnterDirective } from './animateenter.directive'; 

import { PublicRoutingModule } from './public-routing.module';
import { DashboardPublicComponent } from './dashboard-public.component';
import { MenubarModule } from 'primeng/menubar';


@NgModule({
  declarations: [
    AnimateEnterDirective,
    DashboardPublicComponent  
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule,
    StyleClassModule,
    PublicRoutingModule,
    MenubarModule
  ]
})
export class PublicModule { }
