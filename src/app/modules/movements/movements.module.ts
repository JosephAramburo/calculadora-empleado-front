import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { CaptureComponent } from './capture/capture.component';


@NgModule({
  declarations: [
    CaptureComponent
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule
  ]
})
export class MovementsModule { }
