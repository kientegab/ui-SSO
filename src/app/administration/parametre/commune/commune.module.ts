import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommuneRoutingModule } from './commune-routing.module';
import { CommuneComponent } from './commune.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ActionsToolbarIudComponent } from 'src/app/shared/comon/actions-toolbar-iud/actions-toolbar-iud.component';
import { CrudToolbarComponent } from 'src/app/shared/comon/crud-toolbar/crud-toolbar.component';
import { AdministrationModule } from '../../administration.module';
import { AppCommonModule } from 'src/app/shared/common/app-common.module';
import { DetailsCommuneComponent } from './details-commune/details-commune.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CreerModifierCommuneComponent } from './creer-modifier-commune/creer-modifier-commune.component';
import { PaginatorModule } from 'primeng/paginator';

//import { AdministrationModule } from '../../administration.module';


@NgModule({
    declarations: [
        CommuneComponent,
        DetailsCommuneComponent,
        CreerModifierCommuneComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ButtonModule,
        DynamicDialogModule,
        CommuneRoutingModule,
        TableModule,
        CardModule,
        InputTextModule,
        DialogModule,
        DividerModule,
        ProgressBarModule,
        MessageModule,
        DropdownModule,
        AppCommonModule,
        ConfirmDialogModule,
        ProgressSpinnerModule,
        PaginatorModule
    ],

    providers: [ConfirmationService,MessageService],

})
export class CommuneModule {

}
