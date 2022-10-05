import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { CaptureComponent } from './capture/capture.component';
import { ListMovementsComponent } from './list-movements/list-movements.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CaptureComponent,
    ListMovementsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    MovementsRoutingModule
  ]
})
export class MovementsModule { }
