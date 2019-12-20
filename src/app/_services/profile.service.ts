import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ManageUser} from "../model/manage-user";
import {AppConfig} from "../config/app-config";
import {map} from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  /* get Profile Details */
  getUserProfileDetails = () => {
    return this.http.get<ManageUser>(AppConfig.getUserProfile).pipe(map(result => {
      return result;
    }));
  };

  /* Update User Profile */
  updateProfile = (payload) => {
    return this.http.put<ManageUser>(AppConfig.updateUserProfile, payload).pipe(map(result => {
      return result;
    }));
  };

  /* Change Password */
  changeUserPassword = (payload) => {
    return this.http.put<ManageUser>(AppConfig.changePassword, payload).pipe(map(result => {
      return result;
    }));
  };
}
