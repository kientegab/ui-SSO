import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommuneComponent } from './commune.component';


const routes: Routes = [
  {
    path: '', component: CommuneComponent,
  },
  
    // { path: '', redirectTo: 'personal', pathMatch: 'full' },
    // { path: 'personal', component: PersonaldemoComponent },
    // { path: 'seat', component: SeatdemoComponent },
    // { path: 'payment', component: PaymentdemoComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommuneRoutingModule { }
