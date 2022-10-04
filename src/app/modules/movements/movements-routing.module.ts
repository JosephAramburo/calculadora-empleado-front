import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaptureComponent } from './capture/capture.component';

const routes: Routes = [
  { path: '', component: CaptureComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovementsRoutingModule { }
