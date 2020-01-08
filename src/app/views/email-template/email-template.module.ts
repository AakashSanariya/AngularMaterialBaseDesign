import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailTemplateRoutingModule } from './email-template-routing.module';
import { EmailTemplateComponent } from './email-template.component';
import { ListEmailComponent } from './list-email/list-email.component';
import { AddEditEmailComponent } from './add-edit-email/add-edit-email.component';
import {SharedModule} from "../../shared/shared.module";
import {CKEditorModule} from "ngx-ckeditor";
import {AngularEditorModule} from "@kolkov/angular-editor";


@NgModule({
  declarations: [EmailTemplateComponent, ListEmailComponent, AddEditEmailComponent],
  imports: [
    CommonModule,
    EmailTemplateRoutingModule,
    CKEditorModule,
    AngularEditorModule,
    SharedModule
  ]
})
export class EmailTemplateModule { }
