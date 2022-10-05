import { Component, Input, OnInit } from '@angular/core';
import { MovementRowInterface } from '@interfaces/movement-interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-receipt-modal',
  templateUrl: './receipt-modal.component.html',
  styleUrls: ['./receipt-modal.component.scss']
})
export class ReceiptModalComponent implements OnInit {
  @Input() data    : MovementRowInterface = {} as MovementRowInterface;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  getTotalPerceptions():number{
    return this.data.amountVouchers && this.data.sumAmounts ?  Number.parseFloat(this.data?.amountVouchers.toString()) + Number.parseFloat(this.data?.sumAmounts.toString()) : 0;
  }

  get getDeducciones():number{
    return  this.data.total && this.data.amountByMonth ?  this.getTotalPerceptions() - this.data?.total : 0;
  }

  ok():void{
    this.activeModal.close(true);
  }

}
