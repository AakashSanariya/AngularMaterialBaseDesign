import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingsComponent} from "./settings.component";


const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    data: {
      title: 'Settings',
      breadcrumb: [
        {
          label: 'Home',
          url: '/dashboard'
        }
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
