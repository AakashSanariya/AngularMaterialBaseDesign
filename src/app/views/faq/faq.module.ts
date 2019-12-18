import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';
import { ListFaqComponent } from './list-faq/list-faq.component';
import {SharedModule} from "../../shared/shared.module";
import {AddEditFaqComponent} from "./add-edit-faq/add-edit-faq.component";


@NgModule({
  declarations: [FaqComponent, ListFaqComponent, AddEditFaqComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    SharedModule,
  ]
})
export class FaqModule { }
