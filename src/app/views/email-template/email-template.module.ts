import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailTemplateRoutingModule } from './email-template-routing.module';
import { EmailTemplateComponent } from './email-template.component';
import { ListEmailComponent } from './list-email/list-email.component';
import { AddEditEmailComponent } from './add-edit-email/add-edit-email.component';
import {SharedModule} from "../../shared/shared.module";
import {CKEditorModule} from "ngx-ckeditor";


@NgModule({
  declarations: [EmailTemplateComponent, ListEmailComponent, AddEditEmailComponent],
  imports: [
    CommonModule,
    EmailTemplateRoutingModule,
    CKEditorModule,
    SharedModule
  ]
})
export class EmailTemplateModule { }
