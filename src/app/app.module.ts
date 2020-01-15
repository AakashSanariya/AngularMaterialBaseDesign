import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './views/login/login.component';
import {FormsModule} from "@angular/forms";
import {AppMaterialModule} from "./shared/app.material.module";
import {NavbarComponent} from "./container/navbar/navbar.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {ErrorInterceptor} from "./_helpers/error-interceptor";
import {AuthGuard} from "./_guard/auth.guard";
import {NgxPermissionsModule} from "ngx-permissions";
import {JwtInterceptor} from "./_helpers/jwt-interceptor";
import {SharedModule} from "./shared/shared.module";
import {BreadcrumbModule} from "xng-breadcrumb";
import {Page404Component} from "./views/error/page404/page404.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    Page404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    ToastrModule.forRoot({
      closeButton: true,
    }),
    NgxPermissionsModule.forRoot(),
    AppMaterialModule,
    MatSidenavModule,
    BreadcrumbModule,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
