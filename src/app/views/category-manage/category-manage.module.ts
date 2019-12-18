import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryManageRoutingModule } from './category-manage-routing.module';
import { CategoryManageComponent } from './category-manage.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import {SharedModule} from "../../shared/shared.module";
import {TreeviewModule} from "ngx-treeview";
import {NgxTreeSelectModule} from "ngx-tree-select/src/ngx-tree-select.ng-flat";
import { TreeViewCategoryComponent } from './tree-view-category/tree-view-category.component';
import {TreeModule} from "angular-tree-component/dist/angular-tree-component";


@NgModule({
  declarations: [CategoryManageComponent, ListCategoryComponent, AddEditCategoryComponent, TreeViewCategoryComponent],
  imports: [
    CommonModule,
    CategoryManageRoutingModule,
    SharedModule,
    TreeModule.forRoot(),
    TreeviewModule.forRoot(),
    NgxTreeSelectModule.forRoot({
      allowFilter: false,
      allowParentSelection: true,
      expandMode:"All"
    }),
  ]
})
export class CategoryManageModule { }
