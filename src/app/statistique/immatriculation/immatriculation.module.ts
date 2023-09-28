import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImmatriculationRoutingModule } from './immatriculation-routing.module';
import { ImmatriculationComponent } from './immatriculation.component';

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
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';
import { PasswordModule } from 'primeng/password';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [
    ImmatriculationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    CardModule,
    ConfirmDialogModule,
    PanelModule,
    InputTextModule,
    DialogModule,
    PasswordModule,
    AppCommonModule,
    ProgressBarModule,
    AvatarModule,
    CalendarModule,
    FileUploadModule,
    ProgressSpinnerModule,
    DividerModule,
    DropdownModule,
    TableModule,
    MessageModule,
    MessagesModule,
    FormsModule,
    ButtonModule,
    DynamicDialogModule,
    MultiSelectModule,
    ImmatriculationRoutingModule
  ]
})
export class ImmatriculationModule { }
