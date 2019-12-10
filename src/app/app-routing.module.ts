import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./views/login/login.component";
import {NavbarComponent} from "./container/navbar/navbar.component";
import {AuthGuard} from "./_guard/auth.guard";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home',
      breadcrumb: [
        {
          label: 'Home',
          url: '/dashboard'
        }
      ]
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'subadmin',
        loadChildren: './views/subadmin/subadmin.module#SubadminModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
