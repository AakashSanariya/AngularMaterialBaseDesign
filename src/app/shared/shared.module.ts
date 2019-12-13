import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {AppMaterialModule} from "./app.material.module";
import {MustMatchDirectiveDirective} from "../validator/must-match-directive.directive";
import {FormsModule} from "@angular/forms";
import {ImageCropperModule} from "ngx-image-cropper";

@NgModule({
  declarations: [
      MustMatchDirectiveDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppMaterialModule,
    FormsModule,
    ImageCropperModule,
  ],
  exports: [AppMaterialModule, MustMatchDirectiveDirective, FormsModule, ImageCropperModule],
  entryComponents: [],
  providers: [DatePipe],
})
export class SharedModule { }
