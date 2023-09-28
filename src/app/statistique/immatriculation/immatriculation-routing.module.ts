import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImmatriculationComponent } from './immatriculation.component';

const routes: Routes = [
  { path: '', component: ImmatriculationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImmatriculationRoutingModule { }
