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
      title: 'CMS Managemet'
    },
    children: [
      {
        path: 'list',
        component: ListCmsComponent,
        data: {
          title: 'Listing CMS',
          breadcrumb: [
            {
              label: 'list CMS',
              url: '/cmsmanagement/list'
            }
          ]
        },
      },
      {
        path: 'add',
        component: AddEditCMSComponent,
        data: {
          title: 'Add CMS',
          breadcrumb: [
            {
              label: 'list CMS',
              url: '/cmsmanagement/list'
            }
          ]
        },
      },
      {
        path: 'edit/:id',
        component: AddEditCMSComponent,
        data: {
          title: 'Edit CMS',
          breadcrumb: [
            {
              label: 'list CMS',
              url: '/cmsmanagement/list'
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
export class CmsmanagementRoutingModule { }
