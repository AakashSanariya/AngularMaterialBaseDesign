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

  getSubadmin = (payload) => {
    return this.http.post<ManageUser>(AppConfig.listSubAdmin, payload).pipe(map(result => {
      return result;
    }));
  }
}
