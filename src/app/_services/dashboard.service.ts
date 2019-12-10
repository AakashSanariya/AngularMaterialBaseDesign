import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../config/app-config";
import {map} from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getTotalsubAdmin(payload){
    return this.http.post(AppConfig.totalUser, payload).pipe(map(result => {
      return result;
    }));
  }
}
