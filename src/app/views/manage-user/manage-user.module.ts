import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUserRoutingModule } from './manage-user-routing.module';
import {ManageUserComponent} from "./manage-user.component";
import {SharedModule} from "../../shared/shared.module";
import { ListUserComponent } from './list-user/list-user.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';


@NgModule({
  declarations: [ManageUserComponent, ListUserComponent, AddEditUserComponent, ProfileUserComponent],
  imports: [
    CommonModule,
    ManageUserRoutingModule,
    SharedModule,
  ]
})
export class ManageUserModule { }
