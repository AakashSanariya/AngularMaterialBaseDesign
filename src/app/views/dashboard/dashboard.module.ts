import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard.component";
import {FormsModule} from "@angular/forms";
import {AppMaterialModule} from "../../shared/app.material.module";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    HttpClientModule,
    AppMaterialModule,
  ]
})
export class DashboardModule { }
