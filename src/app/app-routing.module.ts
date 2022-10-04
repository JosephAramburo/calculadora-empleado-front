import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogsModule } from './modules/catalogs/catalogs.module';
import { MovementsModule } from './modules/movements/movements.module';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    children:[
      { path: 'catalogs',   loadChildren: () => CatalogsModule },
      { path: 'movements',  loadChildren: () => MovementsModule },
    ]
  },
  { path:'**', redirectTo:'' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
