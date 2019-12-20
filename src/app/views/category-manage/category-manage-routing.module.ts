import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryManageComponent} from "./category-manage.component";
import {ListCategoryComponent} from "./list-category/list-category.component";
import {AddEditCategoryComponent} from "./add-edit-category/add-edit-category.component";
import {TreeViewCategoryComponent} from "./tree-view-category/tree-view-category.component";


const routes: Routes = [
  {
    path: '',
    component: CategoryManageComponent,
    data: {
      title: 'Manage Category',
      breadcrumb: 'list category'
    },
    children: [
      {
        path: 'list',
        component: ListCategoryComponent,
        data:{
          title: 'Listing Category',
          breadcrumb: 'Category List',
        },
      },
      {
        path: 'add',
        component: AddEditCategoryComponent,
        data: {
          title: 'Add Category',
          breadcrumb: 'Category Add',
        }
      },
      {
        path: 'edit/:id',
        component: AddEditCategoryComponent,
        data: {
          title: 'Category Edit',
          breadcrumb: 'Edit Category',
        }
      },
      {
        path: 'treeview',
        component: TreeViewCategoryComponent,
        data: {
          title: 'Tree View',
          breadcrumb: 'TreeView Category',
        }
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryManageRoutingModule { }
