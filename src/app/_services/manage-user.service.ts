import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ManageUser} from "../model/manage-user";
import {AppConfig} from "../config/app-config";
import {map} from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(private http: HttpClient) {
  }

  /* get User List*/
  getManageUserList = (payload) => {
    return this.http.post<ManageUser>(AppConfig.getManageUserList, payload).pipe(map(result => {
      return result;
    }));
  };

  /* Change User Status*/
  changeManageUserStatus = (payload) => {
    return this.http.put<ManageUser>(AppConfig.changeManageUserStatus, payload).pipe(map(result => {
      return result;
    }));
  };

  /* Change User Password*/
  changeUserPassword = (payload) => {
    return this.http.put<ManageUser>(AppConfig.changeManageUserPassword, payload).pipe(map(result => {
      return result;
    }));
  };

  /* delete User*/
  deleteUser = (payload) => {
    return this.http.delete<ManageUser>(AppConfig.deleteManageUser + payload).pipe(map(result => {
      return result;
    }));
  };

  /* add new User*/
  addNewUser = (payload) => {
    return this.http.post<ManageUser>(AppConfig.addNewManageUser, payload).pipe(map(result => {
      return result;
    }))
  };
  
  /* Find user by Id*/
  getUserById = (payload) => {
    return this.http.get<ManageUser>(AppConfig.findUserById + payload).pipe(map(result => {
      return result;
    }));
  };

  /* Update User */
  updateUser = (payload, id) => {
    return this.http.post<ManageUser>(AppConfig.updateUser + id, payload).pipe(map(result => {
      return result;
    }));
  };

}
