import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {AppMaterialModule} from "./app.material.module";
import {MustMatchDirectiveDirective} from "../validator/must-match-directive.directive";

@NgModule({
  declarations: [
      MustMatchDirectiveDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppMaterialModule,
  ],
  exports: [AppMaterialModule, MustMatchDirectiveDirective],
  entryComponents: [],
})
export class SharedModule { }
