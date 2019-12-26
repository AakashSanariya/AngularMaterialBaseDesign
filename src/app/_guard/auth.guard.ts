import { Injectable } from '@angular/core';
import {
    CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router,
    CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import {EncrDecrService} from "../_services/encr-decr.service";
import {AppConfig} from "../config/app-config";
import {NgxPermissionsService} from "ngx-permissions";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private EncrDecr: EncrDecrService,
              private permissionsService: NgxPermissionsService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = localStorage.getItem('token');
    let currentUser = this.EncrDecr.get(AppConfig.EncrDecrKey, token);

    // let currentUserJson = JSON.parse(currentUser);
    let currentUserJson = JSON.parse(currentUser);
    let currentUserRole = currentUserJson.user_detail.role || '';

    if(currentUserRole == 'SUPER_ADMIN'){
      this.permissionsService.loadPermissions(['SUPER_ADMIN']);
      return true;
    }
    let currentUserPermissions = currentUserJson.user_detail.permission || [];
    let routePermission = next.data.permission || null;
    if(routePermission == null || currentUserPermissions.indexOf(routePermission) != -1){
      this.permissionsService.loadPermissions(currentUserPermissions);
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }


  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot
  ){
    return this.canActivate(route, state);
  }
}
