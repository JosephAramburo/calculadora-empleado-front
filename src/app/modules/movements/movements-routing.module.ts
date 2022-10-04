import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaptureComponent } from './capture/capture.component';
import { ListMovementsComponent } from './list-movements/list-movements.component';

const routes: Routes = [
  { path: '',     component: ListMovementsComponent },
  { path: 'add',  component: CaptureComponent },
  { path: ':id',  component: CaptureComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovementsRoutingModule { }
