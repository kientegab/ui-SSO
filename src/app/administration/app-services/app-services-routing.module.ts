import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppServicesComponent } from './app-services.component';

const routes: Routes = [
  { path: '', component: AppServicesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppServicesRoutingModule { }
