import { Injectable } from '@angular/core';
import {
    CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router,
    CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import {EncrDecrService} from "../_services/encr-decr.service";
import {AppConfig} from "../config/app-config";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private EncrDecr: EncrDecrService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = localStorage.getItem('token');
    let currentUser = this.EncrDecr.get(AppConfig.EncrDecrKey, token);

    let currentUserJson = JSON.parse(currentUser);
    if(currentUserJson){
      return true;
    }
    else{
      this.router.navigate(['/403']);
      return false;
    }
  }


  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot
  ){
    return this.canActivate(route, state);
  }
}
