import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppServicesRoutingModule } from './app-services-routing.module';
import { CreerModifierAppServiceComponent } from './creer-modifier-app-service/creer-modifier-app-service.component';
import { DetailsAppServiceComponent } from './details-app-service/details-app-service.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { AppCommonModule } from 'src/app/shared/common/app-common.module';
import { AppServicesComponent } from './app-services.component';


@NgModule({
  declarations: [
    AppServicesComponent,
    CreerModifierAppServiceComponent,
    DetailsAppServiceComponent
  ],
  imports: [
    CommonModule,
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
    AppServicesRoutingModule
  ]
})
export class AppServicesModule { }
