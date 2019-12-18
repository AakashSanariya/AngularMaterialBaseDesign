import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmailTemplateComponent} from "./email-template.component";
import {ListEmailComponent} from "./list-email/list-email.component";
import {AddEditEmailComponent} from "./add-edit-email/add-edit-email.component";


const routes: Routes = [
  {
    path: '',
    component: EmailTemplateComponent,
    children: [
      {
        path: 'list',
        component: ListEmailComponent,
        data: {
          title: 'Listing Email',
          breadcrumb: [
            {
              label: 'list Email',
              url: '/emailtemplate/list'
            }
          ]
        }
      },
      {
        path: 'edit/:id',
        component: AddEditEmailComponent,
        data: {
          title: 'Edit Email',
          breadcrumb: [
            {
              label: 'list Email',
              url: '/emailtemplate/list'
            }
          ]
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailTemplateRoutingModule { }
