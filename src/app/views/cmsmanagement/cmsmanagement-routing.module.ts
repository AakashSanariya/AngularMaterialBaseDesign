import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CMSManagementComponent} from "./cmsmanagement.component";
import {ListCmsComponent} from "./list-cms/list-cms.component";
import {AddEditCMSComponent} from "./add-edit-cms/add-edit-cms.component";


const routes: Routes = [
  {
    path: '',
    component: CMSManagementComponent,
    data: {
      title: 'CMS Managemet',
      breadcrumb: 'CMS List',
    },
    children: [
      {
        path: 'list',
        component: ListCmsComponent,
        data: {
          title: 'Listing CMS',
          breadcrumb: 'CMS List',
        },
      },
      {
        path: 'add',
        component: AddEditCMSComponent,
        data: {
          title: 'Add CMS',
          breadcrumb: 'CMS Add',
        },
      },
      {
        path: 'edit/:id',
        component: AddEditCMSComponent,
        data: {
          title: 'Edit CMS',
          breadcrumb: 'CMS Edit',
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
export class CmsmanagementRoutingModule { }
