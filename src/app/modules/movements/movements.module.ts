import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { CaptureComponent } from './capture/capture.component';
import { ListMovementsComponent } from './list-movements/list-movements.component';


@NgModule({
  declarations: [
    CaptureComponent,
    ListMovementsComponent
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule
  ]
})
export class MovementsModule { }
