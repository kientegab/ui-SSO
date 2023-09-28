import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfosUserRoutingModule } from './infos-user-routing.module';
import { InfosUserComponent } from './infos-user.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordStrengthComponent } from 'src/app/shared/util/password-strength/password-strength.component';


@NgModule({
  declarations: [
    InfosUserComponent,
    PasswordStrengthComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    RippleModule,
    SidebarModule,
    RadioButtonModule,
    InputSwitchModule,
    InfosUserRoutingModule
  ]
})
export class InfosUserModule { }
