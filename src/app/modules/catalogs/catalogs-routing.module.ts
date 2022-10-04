import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormEmployerComponent } from './employer/form-employer/form-employer.component';
import { ListEmployerComponent } from './employer/list-employer/list-employer.component';

const routes: Routes = [
  { path: 'employer',     component: ListEmployerComponent },
  { path: 'employer/add', component: FormEmployerComponent },
  { path: 'employer/:id', component: FormEmployerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogsRoutingModule { }
