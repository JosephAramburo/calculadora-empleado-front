import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { ListEmployerComponent } from './employer/list-employer/list-employer.component';
import { FormEmployerComponent } from './employer/form-employer/form-employer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ListEmployerComponent,
    FormEmployerComponent
  ],
  imports: [
    CommonModule,
    CatalogsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule
  ]
})
export class CatalogsModule { }
