import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../config/app-config";
import {map} from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router,
              private http: HttpClient
  ) { }

  userSignin(payLoad){
    return this.http.post(AppConfig.userSignin, payLoad).pipe(map(result => {
      return result;
    }));
  }

  forgotPassword = (payload) => {
    let addPayload = {
      email: payload.email,
      role: 'ADMIN'
    };
    return this.http.post<any>(AppConfig.forgotPassword, addPayload).pipe(map(result => {
      return result;
    }));
  };

  logout(){
    /* For Log Out remove Token*/
    localStorage.removeItem('token');
  }
}
