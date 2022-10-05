import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { CaptureComponent } from './capture/capture.component';
import { ListMovementsComponent } from './list-movements/list-movements.component';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReceiptModalComponent } from './modals/receipt-modal/receipt-modal.component';


@NgModule({
  declarations: [
    CaptureComponent,
    ListMovementsComponent,
    ReceiptModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    MovementsRoutingModule,
    NgbPaginationModule
  ]
})
export class MovementsModule { }
