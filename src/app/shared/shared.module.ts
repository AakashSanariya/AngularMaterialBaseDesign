import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {AppMaterialModule} from "./app.material.module";
import {MustMatchDirectiveDirective} from "../validator/must-match-directive.directive";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
      MustMatchDirectiveDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppMaterialModule,
    FormsModule,
  ],
  exports: [AppMaterialModule, MustMatchDirectiveDirective, FormsModule],
  entryComponents: [],
})
export class SharedModule { }
