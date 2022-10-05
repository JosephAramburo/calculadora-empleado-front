import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";

export class FormsClass {
    constructor(){}

    markTouchedForm(form: FormGroup): void{
        form.markAllAsTouched();
    }

    setEmptyByControls(frm: FormGroup, arrStr: string[]):void{
        arrStr.forEach(x => {
          frm.get(x)?.patchValue('');
        });
    }

    getFormatToISOString(dp: string):string{
        return new Date(dp).toISOString();
    }

    getFormat(date: string):string{
        let d : Date = new Date(date);
        return `${this.getFormatDayMonth(d.getDate().toString())}/${this.getFormatDayMonth((d.getMonth() + 1).toString())}/${d.getFullYear()}`;
    }
    
    getFormatDayMonth(dm:string):string{
        return parseInt(dm) < 10 ? `0${dm}` : dm;
    }

    getFormatCurrency(valueNumber : number): string{
        return `$${(valueNumber).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    }
    
    inputValidation(frm: FormGroup, name : string) : Object{
        return {
          'is-invalid': (frm.controls[name].dirty || frm.controls[name].touched)  && frm.controls[name].invalid, 
          'is-valid': frm.controls[name].touched && frm.controls[name].valid
        }
    }
    
    showErrors(frm: FormGroup, name : string):boolean{
        return frm.controls[name].invalid && (frm.controls[name].dirty || frm.controls[name].touched);
    }
    
    messageError(err : HttpErrorResponse) : string{
        return err.error.message !== null && err.error.message !== '' ? err.error.message.toString() : err.message.toString();
    }
}
