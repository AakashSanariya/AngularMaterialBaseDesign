import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {AppMaterialModule} from "./app.material.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AppMaterialModule,
  ],
  exports: [AppMaterialModule]
})
export class SharedModule { }
