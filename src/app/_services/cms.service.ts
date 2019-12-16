import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ManageUser} from "../model/manage-user";
import {AppConfig} from "../config/app-config";
import {map} from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor(private http: HttpClient) { }


  /*Listing CMS Management*/
  getAllCMS = () => {
    return this.http.get<ManageUser>(AppConfig.getAllCmsList).pipe(map(result => {
      return result;
    }));
  };
  
  /* Change CMS Status*/
  changeCMSStatus = (payload) => {
    return this.http.put<ManageUser>(AppConfig.changeCmsStauts, payload).pipe(map(result => {
      return result;
    }));
  };

  /* Find CMS By Id*/
  findCMSById = (payload) => {
    return this.http.get<ManageUser>(AppConfig.getCmsById + payload).pipe(map(result => {
      return result;
    }));
  };

  /* Add CMS*/
  addNewCms = (payload) => {
    return this.http.post<ManageUser>(AppConfig.addCms, payload).pipe(map(result => {
      return result;
    }));
  };

  updateCms = (payload, id) => {
    return this.http.put<ManageUser>(AppConfig.updateCms + id, payload).pipe(map(result => {
      return result;
    }));
  }

}
