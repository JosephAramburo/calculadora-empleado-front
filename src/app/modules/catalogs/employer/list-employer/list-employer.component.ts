import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FilterInterface } from '@interfaces/api-rest-interface';
import { EmployerInterface, EmployerRowInterface } from '@interfaces/employer-interface';
import { QuestionComponent } from '@modules/modals/question/question.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployerService } from '@services/employer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-employer',
  templateUrl: './list-employer.component.html',
  styleUrls: ['./list-employer.component.scss']
})
export class ListEmployerComponent implements OnInit {
  filters     : FilterInterface       = { currentPage: 1, limit: 10 } as FilterInterface;
  totalRows   : number                = 0;
  data        : EmployerRowInterface[]= [];
  dataForPage : number[]              = [ 10, 20, 30, 50, 100 ]

  constructor(
    private _employer     : EmployerService,
    private _modalService : NgbModal,
    private _toast        : ToastrService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this._employer.paginated(this.filters).subscribe({ next: res => {
      this.totalRows  = res.count;
      this.data       = res.rows;
    }, error: (err: HttpErrorResponse) => {

    }});
  }

  openModalDelete(idEmp : number | undefined):void{
    if(idEmp == undefined)
      return;

    let modal : NgbModalRef       = this._modalService.open(QuestionComponent, { centered: true });
    modal.componentInstance.title = 'Empleados';

    modal.result.then(res => {
      this._employer.delete(idEmp).subscribe({
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
