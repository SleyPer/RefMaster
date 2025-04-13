import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DesignationsComponent } from './components/designations/designations.component';
import { StatistiquesComponent } from './components/statistiques/statistiques.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'designations', component: DesignationsComponent },
  { path: 'statistiques', component: StatistiquesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
