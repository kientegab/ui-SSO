import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfosUserComponent } from './infos-user.component';

const routes: Routes = [
  { path: '', component: InfosUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfosUserRoutingModule { }
