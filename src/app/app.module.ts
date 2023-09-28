import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { PublicModule } from './public/public.module';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ComonModule } from './shared/comon/comon.module';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';

import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { ArchwizardModule } from 'angular-archwizard';
import { AuthInterceptorProviders } from './shared/_helpers/auth.interceptor';



@NgModule({
    declarations: [
        AppComponent,
      //  CreerModifierEmploiComponent,
        // ActionToolBarIudComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        ComonModule,
        DividerModule,
        FormsModule ,
        CdkStepperModule,
        ArchwizardModule.forRoot(),
    ],
    providers: [
       // { provide: LocationStrategy, useClass: HashLocationStrategy },
        DialogService,
        ConfirmationService,
        MessageService,
        DynamicDialogRef,
        CdkStepper,
        AuthInterceptorProviders
    ],
    exports: [
        // ActionToolBarIudComponent
        // DividerModule
        MessagesModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
