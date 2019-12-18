import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListFaqComponent} from "./list-faq/list-faq.component";
import {AddEditFaqComponent} from "./add-edit-faq/add-edit-faq.component";


const routes: Routes = [
  {
    path: '',
    component: ListFaqComponent,
    data: {
      title: 'FAQ Management'
    }
  },
  {
    path: 'list',
    component: ListFaqComponent,
    data: {
      title: 'List Faq',
      breadcrumb: [
        {
          label: 'list faq',
          url: '/faq/list'
        }
      ]
    }
  },
  {
    path: 'add',
    component: AddEditFaqComponent,
    data: {
      title: 'Add Faq',
      breadcrumb: [
        {
          label: 'list faq',
          url: '/faq/list'
        }
      ]
    }
  },
  {
    path: 'edit/:id',
    component: AddEditFaqComponent,
    data: {
      title: 'Edit Faq',
      breadcrumb: [
        {
          label: 'list faq',
          url: '/faq/list'
        }
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
