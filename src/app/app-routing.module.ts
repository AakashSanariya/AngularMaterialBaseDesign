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
      breadcrumb: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'subadmin',
        loadChildren: './views/subadmin/subadmin.module#SubadminModule',
      },
      {
        path: 'user',
        loadChildren: './views/manage-user/manage-user.module#ManageUserModule'
      },
      {
        path: 'cmsmanagement',
        loadChildren: './views/cmsmanagement/cmsmanagement.module#CmsmanagementModule'
      },
      {
        path: 'category',
        loadChildren: './views/category-manage/category-manage.module#CategoryManageModule'
      },
      {
        path: 'emailtemplate',
        loadChildren: './views/email-template/email-template.module#EmailTemplateModule'
      },
      {
        path: 'faq',
        loadChildren: './views/faq/faq.module#FaqModule'
      },
      {
        path: 'rolepermission',
        loadChildren: './views/role-permission/role-permission.module#RolePermissionModule'
      },
      {
        path: 'settings',
        loadChildren: './views/settings/settings.module#SettingsModule'
      },
      {
        path: 'profile',
        loadChildren: './views/profile/profile.module#ProfileModule'
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
