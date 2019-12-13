import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManageUserComponent} from "./manage-user.component";
import {ListUserComponent} from "./list-user/list-user.component";
import {AddEditUserComponent} from "./add-edit-user/add-edit-user.component";
import {ProfileUserComponent} from "./profile-user/profile-user.component";


const routes: Routes = [
  {
    path: '',
    component: ManageUserComponent,
    data: {
      title: 'Manage User'
    },
    children: [
      {
        path: 'list',
        component: ListUserComponent,
        data: {
          title: 'Listing User',
          breadcrumb: [
            {
              label: 'list User',
              url: '/user/list'
            }
          ]
        },
      },
      {
        path: 'edit/:id',
        component: AddEditUserComponent,
        data: {
          title: 'Edit user',
          breadcrumb: [
            {
              label: 'list user',
              url: '/user/list'
            }
          ]
        }
      },
      {
        path: 'add',
        component: AddEditUserComponent,
        data: {
          title: 'Add User',
          breadcrumb: [
            {
              label: 'list user',
              url: '/user/list'
            }
          ]
        }
      },
      {
        path: 'profile/:id',
        component: ProfileUserComponent,
        data: {
          title: 'Profile',
          breadcrumb: [
            {
              label: 'list',
              url: '/user/list'
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
export class ManageUserRoutingModule { }
