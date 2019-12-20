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
      title: 'Manage User',
      breadcrumb: 'User List'
    },
    children: [
      {
        path: 'list',
        component: ListUserComponent,
        data: {
          title: 'Listing User',
          breadcrumb: 'User List',
        },
      },
      {
        path: 'edit/:id',
        component: AddEditUserComponent,
        data: {
          title: 'Edit user',
          breadcrumb: 'User Edit',
        }
      },
      {
        path: 'add',
        component: AddEditUserComponent,
        data: {
          title: 'Add User',
          breadcrumb: 'User Add',
        }
      },
      {
        path: 'profile/:id',
        component: ProfileUserComponent,
        data: {
          title: 'Profile',
          breadcrumb: 'User Profile',
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
export class ManageUserRoutingModule { }
