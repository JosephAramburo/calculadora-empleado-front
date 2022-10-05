import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsClass } from '@class/forms-class';
import { EmployerInterface } from '@interfaces/employer-interface';
import { RoleInterface } from '@interfaces/role-interface';
import { TypeEmployerInterface } from '@interfaces/type-employer-interface';
import { EmployerService } from '@services/employer.service';
import { RoleService } from '@services/role.service';
import { TypeEmployerService } from '@services/type-employer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-employer',
  templateUrl: './form-employer.component.html',
  styleUrls: ['./form-employer.component.scss']
})
export class FormEmployerComponent extends FormsClass implements OnInit {
  title       : string                  = 'Nuevo Empleado';
  listRoles   : RoleInterface[]         = [];
  listTypeEmp : TypeEmployerInterface[] = [];
  frmEmployer : FormGroup               = new FormGroup({
    id              : new FormControl({value: '', disabled: true}),
    name            : new FormControl('', [Validators.required]),
    lastName        : new FormControl('', [Validators.required]),
    roleId          : new FormControl('', [Validators.required]),
    typeEmployerId  : new FormControl('', [Validators.required])
  });

  constructor(
    private _roleService          : RoleService,
    private _typeEmployerService  : TypeEmployerService,
    private _employerService      : EmployerService,
    private _toast                : ToastrService
  ) { 
    super();
  }

  ngOnInit(): void {
    this.getRoles();
    this.getTypesEmployers();
  }

  getRoles():void{
    this._roleService.get().subscribe({
      next: res => {
        this.listRoles = res;
      },
      error: (err:HttpErrorResponse) => {

      }
    });
  }

  getTypesEmployers():void{
    this._typeEmployerService.get().subscribe({
      next: res => {
        this.listTypeEmp = res;
      },
      error: (err:HttpErrorResponse) => {

      }
    });
  }

  save():void{
    if(this.frmEmployer.invalid){
      this.markTouchedForm(this.frmEmployer);
      return;
    }

    let params = this.frmEmployer.getRawValue() as EmployerInterface;

    this._employerService.post(params).subscribe({
      next: res => {
        this._toast.success('Empleado creado correctamente');
      },
      error: (err:HttpErrorResponse) => {
        this._toast.error(this.messageError(err));
      }
    });
  }

}
