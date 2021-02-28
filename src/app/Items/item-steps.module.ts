import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemStepsComponent } from './components/item-steps/item-steps.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemsService } from './services/items.service';
import { ItemListComponent } from './components/item-list/item-list.component';
import { StepsService } from './services/steps.service';

const routes: Routes = [
  {
    path: '',
    component: ItemStepsComponent
  },
  {
    path: 'items',
    component: ItemListComponent
  }
];

@NgModule({
  declarations: [
    ItemStepsComponent,
    ItemListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ItemsService, StepsService
  ]
})
export class ItemStepsModule { }
