import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-employer',
  templateUrl: './form-employer.component.html',
  styleUrls: ['./form-employer.component.scss']
})
export class FormEmployerComponent implements OnInit {
  title: string = 'Nuevo Empleado';

  constructor() { }

  ngOnInit(): void {
  }

}
