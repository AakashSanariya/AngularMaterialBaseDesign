import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ManageUser} from "../model/manage-user";
import {AppConfig} from "../config/app-config";
import {map} from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {

  constructor(private http: HttpClient) { }

  /* List Email Templates*/
  getAllEmailTemplate = () => {
    return this.http.get<ManageUser>(AppConfig.getAllEmailTemplate).pipe(map(result => {
      return result;
    }));
  };
  
  /* Get Email Template By ID*/
  getEmailTemplateById = (payload) => {
    return this.http.get<ManageUser>(AppConfig.getEmailTemplateById + payload).pipe(map(result => {
      return result;
    }));
  };

  /* Update Email Template*/

  updateEmailTemplate = (id, payload) => {
    return this.http.put<ManageUser>(AppConfig.updateEmailTemplate + id, payload).pipe(map(result => {
      return result;
    }));
  };
}
