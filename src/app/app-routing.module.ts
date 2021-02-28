import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'steps',
    pathMatch: 'full',
  },
  {
    path: 'steps',
    loadChildren: () => import('./Items/item-steps.module').then(m => m.ItemStepsModule),
  },
  {
    path: '**',
    loadChildren: () => import('./Items/item-steps.module').then(m => m.ItemStepsModule),
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    ),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
