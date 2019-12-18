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
      title: 'Manage Category'
    },
    children: [
      {
        path: 'list',
        component: ListCategoryComponent,
        data:{
          title: 'Listing Category',
          breadcrumb: [
            {
              label: 'list Category',
              url: '/category/list'
            }
          ]
        },
      },
      {
        path: 'add',
        component: AddEditCategoryComponent,
        data: {
          title: 'Add Category',
          breadcrumb: [
            {
              label: 'list Category',
              url: '/category/list'
            }
          ]
        }
      },
      {
        path: 'edit/:id',
        component: AddEditCategoryComponent,
        data: {
          title: 'Edit Category',
          breadcrumb: [
            {
              label: 'list Category',
              url: '/category/list'
            }
          ]
        }
      },
      {
        path: 'treeview',
        component: TreeViewCategoryComponent,
        data: {
          title: 'Tree View',
          breadcrumb: [
            {
              label: 'list category',
              url: '/category/list'
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
export class CategoryManageRoutingModule { }
