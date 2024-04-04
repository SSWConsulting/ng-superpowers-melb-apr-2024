import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './company/company-list/company-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'company/list' },
  {
    path: 'company/list',
    component: CompanyListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
