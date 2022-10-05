import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FilterInterface } from '@interfaces/api-rest-interface';
import { EmployerInterface, EmployerRowInterface } from '@interfaces/employer-interface';
import { EmployerService } from '@services/employer.service';

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
    private _employer : EmployerService
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

}
