import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffiliationComponent } from './affiliation.component';

const routes: Routes = [
  { path: '', component: AffiliationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffiliationRoutingModule { }
