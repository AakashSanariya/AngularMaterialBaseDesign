import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubadminRoutingModule } from './subadmin-routing.module';
import { ListSubadminComponent } from './list-subadmin/list-subadmin.component';
import {SubadminComponent} from "./subadmin.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [ListSubadminComponent, SubadminComponent],
  imports: [
    CommonModule,
    SubadminRoutingModule,
    SharedModule,
  ]
})
export class SubadminModule { }
