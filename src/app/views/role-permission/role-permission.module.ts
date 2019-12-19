import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolePermissionRoutingModule } from './role-permission-routing.module';
import { RolePermissionComponent } from './role-permission.component';
import {SharedModule} from "../../shared/shared.module";
import {TreeviewModule} from "ngx-treeview/src/treeview.module";
import {TreeModule} from "angular-tree-component/dist/angular-tree-component";


@NgModule({
  declarations: [RolePermissionComponent],
  imports: [
    CommonModule,
    RolePermissionRoutingModule,
    SharedModule,
    TreeModule.forRoot(),
    TreeviewModule.forRoot(),
  ]
})
export class RolePermissionModule { }
