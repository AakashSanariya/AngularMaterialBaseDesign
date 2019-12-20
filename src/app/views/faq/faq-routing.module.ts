import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListFaqComponent} from "./list-faq/list-faq.component";
import {AddEditFaqComponent} from "./add-edit-faq/add-edit-faq.component";


const routes: Routes = [
  {
    path: '',
    component: ListFaqComponent,
    data: {
      title: 'FAQ Management',
      breadcrumb: 'FAQ List',
    },
  },
  {
    path: 'list',
    component: ListFaqComponent,
    data: {
      title: 'List Faq',
      breadcrumb: 'FAQ List',
    }
  },
  {
    path: 'add',
    component: AddEditFaqComponent,
    data: {
      title: 'Add Faq',
      breadcrumb: 'FAQ Add',
    }
  },
  {
    path: 'edit/:id',
    component: AddEditFaqComponent,
    data: {
      title: 'Edit Faq',
      breadcrumb: 'FAQ Edit',
    }
  },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
