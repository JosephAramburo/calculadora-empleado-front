import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsClass } from '@class/forms-class';
import { EmployerRowInterface } from '@interfaces/employer-interface';
import { MovementInterface } from '@interfaces/movement-interface';
import { EmployerService } from '@services/employer.service';
import { MovementService } from '@services/movement.service';
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
  seletedEmployer : EmployerRowInterface  = {} as EmployerRowInterface;
  frmMovement     : FormGroup             = new FormGroup({
    employerId        : new FormControl(''),
    dateMovement      : new FormControl('', [Validators.required]),
    quantityDeliveries: new FormControl('', [Validators.required]),
    coverShifts       : new FormControl(false)
  });

  constructor(
    private _employerService      : EmployerService,
    private _toast                : ToastrService,
    private _router               : Router,
    private _route                : ActivatedRoute,
    private _movementService      : MovementService
  ) {
    super();
   }

  ngOnInit(): void {
  }

  get isEmptySelectedEmployer():boolean{
    return Object.keys(this.seletedEmployer).length > 0;
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

  setValidatorQuantityDaysShifts(evt:any):void{
    let isActiveCheckBox  : boolean                 = this.frmMovement.get('coverShifts')?.value;
    let formControl       : AbstractControl | null  = this.frmMovement.get('quantityDaysShifts');

    if(isActiveCheckBox){
      formControl?.addValidators([Validators.required]);
    }else{
      formControl?.clearValidators();
    }

    formControl?.updateValueAndValidity();
    formControl?.markAllAsTouched();
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

    this._movementService.post(params).subscribe({
      next: res => {
        this._toast.success('Movimiento creado correctamente');
      },
      error: (err:HttpErrorResponse) => {

      }
    });
  }
}
