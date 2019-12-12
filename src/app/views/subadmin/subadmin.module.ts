import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubadminRoutingModule } from './subadmin-routing.module';
import { ListSubadminComponent } from './list-subadmin/list-subadmin.component';
import {SubadminComponent} from "./subadmin.component";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import { AddEditSubadminComponent } from './add-edit-subadmin/add-edit-subadmin.component';


@NgModule({
  declarations: [ListSubadminComponent, SubadminComponent, AddEditSubadminComponent],
  imports: [
    CommonModule,
    SubadminRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class SubadminModule { }
