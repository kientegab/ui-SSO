import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotisationComponent } from './cotisation.component';

const routes: Routes = [
  { path: '', component: CotisationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotisationRoutingModule { }
