import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { ListEmployerComponent } from './employer/list-employer/list-employer.component';
import { FormEmployerComponent } from './employer/form-employer/form-employer.component';


@NgModule({
  declarations: [
    ListEmployerComponent,
    FormEmployerComponent
  ],
  imports: [
    CommonModule,
    CatalogsRoutingModule
  ]
})
export class CatalogsModule { }
