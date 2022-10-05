import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsClass } from '@class/forms-class';
import { EmployerRowInterface } from '@interfaces/employer-interface';
import { MovementInterface } from '@interfaces/movement-interface';
import { RoleInterface } from '@interfaces/role-interface';
import { EmployerService } from '@services/employer.service';
import { MovementService } from '@services/movement.service';
import { RoleService } from '@services/role.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, debounceTime, distinctUntilChanged, filter, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent extends FormsClass implements OnInit {
  title           : string                = 'Nuevo Movimiento';
  id              : number                = 0;
  filterEmployer  : string                = '';
  listRoles       : RoleInterface[]       = [];
  seletedEmployer : EmployerRowInterface  = {} as EmployerRowInterface;
  frmMovement     : FormGroup             = new FormGroup({
    id                : new FormControl(0),
    employerId        : new FormControl(''),
    dateMovement      : new FormControl('', [Validators.required]),
    quantityDeliveries: new FormControl('', [Validators.required]),
    coverShifts       : new FormControl(false),
    daysCovered       : new FormControl(''),
    roleCoveredId     : new FormControl('')
  });

  constructor(
    private _employerService      : EmployerService,
    private _roleService          : RoleService,
    private _toast                : ToastrService,
    private _router               : Router,
    private _route                : ActivatedRoute,
    private _movementService      : MovementService
  ) {
    super();
   }

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'] || 0;

    if(this.id != 0){
      this.title = 'Editar Movimiento';
      this.getById();
    }
    this.getRoles();
  }

  getById():void{
    this._movementService.getById(this.id).subscribe({
      next: res => {
        this.frmMovement.setValue({
          id                : res.id,
          employerId        : res.employerId,
          dateMovement      : new Date(res.dateMovement).toISOString().slice(0, 7),
          quantityDeliveries: res.quantityDeliveries,
          coverShifts       : !(res.coverShifts == '0'),
          daysCovered       : res.daysCovered,
          roleCoveredId     : res.roleCoveredId,
        });

        this.frmMovement.get('dateMovement')?.disable();

        this.getEmployerDetailById(res.employerId).then(res => {
          this.filterEmployer   = '';
          this.seletedEmployer  = res;
        }).catch(err => {
    
        });
      },
      error: (err:HttpErrorResponse) => {

      }
    });
  }

  getRoles():void{
    this._roleService.get().subscribe({
      next : res => {
        this.listRoles = res.filter(x => x.id != 3);
      },
      error: (err:HttpErrorResponse) => { }});
  }

  get isEmptySelectedEmployer():boolean{
    return Object.keys(this.seletedEmployer).length > 0;
  }

  get showRoleCoveredId():boolean{
    return this.frmMovement.get('coverShifts')?.value && (this.seletedEmployer?.roleId && this.seletedEmployer.roleId.toString() == '3')
  }

  get isAuxiliar():boolean{
    return Object.keys(this.seletedEmployer).length > 0 && this.seletedEmployer.roleId == '3';
  }

  search = (text$: Observable<any>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => this.filterEmployer.length > 2),
      switchMap(term =>
        this._employerService.autocomplete(this.filterEmployer).pipe(catchError(() =>{
          return of([]);
        }))
      )
  )

  formatter = (emp: any) => emp && Object.keys(emp).length > 0 ? `${emp.id} - ${emp.name} ${emp.lastName}` : '';

  selectEmployer(e:any){
    this.getEmployerDetailById(e.item.id).then(res => {
      this.filterEmployer   = '';
      this.seletedEmployer  = res;
    }).catch(err => {

    });
  }

  getEmployerDetailById(employerId:number):Promise<EmployerRowInterface>{
    return new Promise((resolve, reject) => {
      this._employerService.getDetailById(employerId).subscribe({next: res => {
        resolve(res);
      }, error: (err: HttpErrorResponse) => {
        reject(err);
      }});
    });
  }

  setValidatorRoleCoveredId(evt:any):void{
    let isActiveCheckBox  : boolean   = this.frmMovement.get('coverShifts')?.value;
    let controls          : string [] = ['roleCoveredId','daysCovered'];
    
    isActiveCheckBox ? this.setValidatorsByControls(this.frmMovement, controls, [Validators.required]) : this.clearValidatorsByControls(this.frmMovement, controls);
  }

  save():void{
    if(this.id == 0 && !this.isEmptySelectedEmployer){
      this._toast.warning('Debe de seleccionar un empleado');
      return;
    }

    if(this.frmMovement.invalid){
      this.markTouchedForm(this.frmMovement);
      return;
    }

    if(this.id == 0){
      this.frmMovement.get('employerId')?.setValue(this.seletedEmployer.id);
    }

    let params : MovementInterface  = this.frmMovement.getRawValue() as MovementInterface;
    params.coverShifts              = params.coverShifts ? '1' : '0';

    this._movementService[this.id == 0 ? 'post' : 'put'](params).subscribe({
      next: res => {
        this._toast.success(`Movimiento ${this.id == 0 ? 'creado' : 'actualizado'} correctament`);
        this._router.navigate(['/movements']);
      },
      error: (err:HttpErrorResponse) => {
        this._toast.error(this.messageError(err))
      }
    });
  }
}
