import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmailTemplateComponent} from "./email-template.component";
import {ListEmailComponent} from "./list-email/list-email.component";
import {AddEditEmailComponent} from "./add-edit-email/add-edit-email.component";


const routes: Routes = [
  {
    path: '',
    component: EmailTemplateComponent,
    data: {
      title: 'Email List',
      breadcrumb: 'List Email'
    },
    children: [
      {
        path: 'list',
        component: ListEmailComponent,
        data: {
          title: 'Listing Email',
          breadcrumb: 'Email List',
        }
      },
      {
        path: 'edit/:id',
        component: AddEditEmailComponent,
        data: {
          title: 'Edit Email',
          breadcrumb: 'Email Edit',
        }
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailTemplateRoutingModule { }
