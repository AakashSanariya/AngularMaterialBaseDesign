import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../config/app-config";
import {map} from "rxjs/internal/operators/map";
import {ManageUser} from "../model/manage-user";

@Injectable({
  providedIn: 'root'
})
export class ManageSubadminService {

  constructor(private http: HttpClient) { }

  /* Listing SubAdmin*/
  getSubadmin = (payload) => {
    return this.http.post<ManageUser>(AppConfig.listSubAdmin, payload).pipe(map(result => {
      return result;
    }));
  };

  /* User Role For Filtering*/
  getActivateUserRole = () => {
    return this.http.get<ManageUser>(AppConfig.activateRole).pipe(map(result => {
      return result;
    }));
  };

  /* Filter Sub Admin*/
  filterSubaadmin = (payload) => {
    return this.http.post<ManageUser>(AppConfig.filterSubadmin, payload).pipe(map(result => {
      return result;
    }));
  };

  /* change Status*/
  changeSubAdminStatus = (payload) => {
    return this.http.put<any>(AppConfig.changeSubAdminStatus, payload).pipe(map(result => {
      return result;
    }));
  };

  /* sub admin by id*/
  getSubAdminById = (payload) => {
    return this.http.get<ManageUser>(AppConfig.subAdminByID + payload).pipe(map(result => {
      return result;
    }));
  };

  /* Add New Sub Admin */
  addNewSubadmin = (payload) => {
    return this.http.post<ManageUser>(AppConfig.addNewSubadmin, payload).pipe(map(result => {
      return result;
    }));
  };

  /* Edit Sub Admin Details*/
  editSubAdmin = (payload, id) => {
    return this.http.put<ManageUser>(AppConfig.editSubAdmin+id, payload).pipe(map(result => {
      return result;
    }));
  };

  /* Password Change Sub Admin*/
  paswordChange = (payload) => {
    return this.http.put<ManageUser>(AppConfig.subadminPasswordChange, payload).pipe(map(result => {
      return result;
    }));
  };

  /* Delete Sub Admin*/
  deleteSubadmin = (payload) => {
    return this.http.delete<ManageUser>(AppConfig.deleteSubAdmin + payload).pipe(map(result => {
      return result;
    }));
  }
}
