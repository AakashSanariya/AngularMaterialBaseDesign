import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListSubadminComponent} from "./list-subadmin/list-subadmin.component";
import {SubadminComponent} from "./subadmin.component";
import {AddEditSubadminComponent} from "./add-edit-subadmin/add-edit-subadmin.component";


const routes: Routes = [
  {
    path: '',
    component: SubadminComponent,
    data: {
      title: 'Manage Sub Admin'
    },
    children: [
      {
        path: 'list',
        component: ListSubadminComponent,
        data: {
          title: 'List Sub Admin',
          breadcrumb: [
            {
              label: 'list sub admin',
              url: '/subadmin/list'
            }
          ]
        },
      },
      {
        path: 'edit/:id',
        component: AddEditSubadminComponent,
        data: {
          title: 'Edit Sub Admin',
          breadcrumb: [
            {
              label: 'list sub admin',
              url: '/subadmin/list'
            }
          ]
        }
      },
      {
        path: 'add',
        component: AddEditSubadminComponent,
        data: {
          title: 'Add Sub Admin',
          breadcrumb: [
            {
              label: 'list sub admin',
              url: '/subadmin/list'
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
export class SubadminRoutingModule { }
