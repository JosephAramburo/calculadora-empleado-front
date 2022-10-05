import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  id          : number                  = 0;
  frmEmployer : FormGroup               = new FormGroup({
    id              : new FormControl({value: '', disabled: true}),
    name            : new FormControl('', [Validators.required]),
    lastName        : new FormControl('', [Validators.required]),
    roleId          : new FormControl('', [Validators.required]),
    typeEmployerId  : new FormControl('', [Validators.required]),
    status          : new FormControl('1')
  });

  constructor(
    private _roleService          : RoleService,
    private _typeEmployerService  : TypeEmployerService,
    private _employerService      : EmployerService,
    private _toast                : ToastrService,
    private _router               : Router,
    private _route                : ActivatedRoute
  ) { 
    super();
  }

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'] || 0;

    if(this.id != 0){
      this.title = 'Editar Empleado';
      this.getEmployerById();
    }

    this.getRoles();
    this.getTypesEmployers();
  }

  getEmployerById():void{
    this._employerService.getById(this.id).subscribe({
      next: res => {
        delete res.createdAt;
        delete res.updatedAt;
        this.frmEmployer.setValue(res);
      },
      error: (err:HttpErrorResponse) => {

      }
    });
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

    if(this.id == 0)
      delete params.id;

    this._employerService[this.id != 0 ? 'put' : 'post'](params).subscribe({
      next: res => {
        this._toast.success(`Empleado ${this.id != 0 ? 'actualizado' : 'creado'} correctamente`);
        this._router.navigate(['/catalogs/employer']);
      },
      error: (err:HttpErrorResponse) => {
        this._toast.error(this.messageError(err));
      }
    });
  }

}
