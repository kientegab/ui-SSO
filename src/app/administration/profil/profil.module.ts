import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './profil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { AppCommonModule } from 'src/app/shared/common/app-common.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CreerModifierProfilComponent } from './creer-modifier-profil/creer-modifier-profil.component';
import { DetailsProfilComponent } from './details-profil/details-profil.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProfilPrivilegeComponent } from './profil-privilege/profil-privilege.component';


@NgModule({
  declarations: [
    ProfilComponent,
    CreerModifierProfilComponent,
    DetailsProfilComponent,
    ProfilPrivilegeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    CardModule,
    ConfirmDialogModule,
    PanelModule,
    InputTextModule,
    DialogModule,
    AppCommonModule,
    ProgressSpinnerModule,
    DividerModule,
    TableModule,
    MessageModule,
    MessagesModule,
    ProgressBarModule,
    FormsModule,
    ButtonModule,
    DynamicDialogModule, 
    ProfilRoutingModule
  ]
})
export class ProfilModule { }
