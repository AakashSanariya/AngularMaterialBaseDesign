import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsmanagementRoutingModule } from './cmsmanagement-routing.module';
import { ListCmsComponent } from './list-cms/list-cms.component';
import {SharedModule} from "../../shared/shared.module";
import {CMSManagementComponent} from "./cmsmanagement.component";
import { AddEditCMSComponent } from './add-edit-cms/add-edit-cms.component';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
  declarations: [CMSManagementComponent, ListCmsComponent, AddEditCMSComponent],
  imports: [
    CommonModule,
    CmsmanagementRoutingModule,
    CKEditorModule,
    SharedModule,
  ]
})
export class CmsmanagementModule { }
