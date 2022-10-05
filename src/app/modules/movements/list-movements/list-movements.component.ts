import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FilterInterface } from '@interfaces/api-rest-interface';
import { MovementRowInterface } from '@interfaces/movement-interface';
import { QuestionComponent } from '@modules/modals/question/question.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MovementService } from '@services/movement.service';

@Component({
  selector: 'app-list-movements',
  templateUrl: './list-movements.component.html',
  styleUrls: ['./list-movements.component.scss']
})
export class ListMovementsComponent implements OnInit {
  filters     : FilterInterface       = { currentPage: 1, limit: 10 } as FilterInterface;
  totalRows   : number                = 0;
  data        : MovementRowInterface[]= [];
  dataForPage : number[]              = [ 10, 20, 30, 50, 100 ]

  constructor(
    private _movementsService : MovementService,
    private _modalService     : NgbModal,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this._movementsService.paginated(this.filters).subscribe({ next: res => {
      this.totalRows  = res.count;
      this.data       = res.rows;
    }, error: (err: HttpErrorResponse) => {

    }});
  }

  openModalDelete(idMov : number | undefined):void{
    if(idMov == undefined)
      return;

    let modal : NgbModalRef       = this._modalService.open(QuestionComponent, { centered: true });
    modal.componentInstance.title = 'Movimiento';

    modal.result.then(res => {
      this._movementsService.delete(idMov).subscribe({
        next: response => {
          this.getData();
        },
        error: (err: HttpErrorResponse) => {

        }
      });
    }).catch(err => {

    });
  }

}
