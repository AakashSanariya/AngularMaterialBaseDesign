import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ManageUser} from "../model/manage-user";
import {AppConfig} from "../config/app-config";
import {map} from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {

  constructor(private http: HttpClient) { }
  
  /*get All Role List */
  getAllRoleList = () => {
    return this.http.get<ManageUser>(AppConfig.getAllRoleList).pipe(map(result => {
      return result;
    }));
  };

  /* Get All Permission List*/
  getAllPermissionList = (payload) => {
    let addPayload = {
      role_id: payload
    };
    return this.http.post<ManageUser>(AppConfig.getAllPermissionList, addPayload).pipe(map(result => {
      return result;
    }));
  };

  /* Assign a New Permission */
  assignPermission = (payload, roleId) => {
    let addPayload = {
      'permission_key': payload.toString(),
    };
    return this.http.post<ManageUser>(AppConfig.assignPermission + roleId, addPayload).pipe(map(result => {
      return result;
    }));
  };

  /* Change Role Status*/
  changeRoleStatus = (payload) => {
    return this.http.put<ManageUser>(AppConfig.changeRoleStatus, payload).pipe(map(result => {
      return result;
    }));
  };

  /* Update Role*/
  updateRoleDialog = (id, payload) => {
    return this.http.put<ManageUser>(AppConfig.updateRole + id, payload).pipe(map(result => {
      return result;
    }));
  };

  /* Add New Role */
  addNewRole = (payload) => {
    return this.http.post<ManageUser>(AppConfig.addNewRole, payload).pipe(map(result => {
      return result;
    }));
  }

}
