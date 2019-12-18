import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ManageUser} from "../model/manage-user";
import {AppConfig} from "../config/app-config";
import {map} from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) { }
  
  /* Get All faq*/
  getAllFaq = () => {
    return this.http.get<ManageUser>(AppConfig.getAllFaq).pipe(map(result => {
      return result;
    }));
  };

  /* Change Status */
  changeFaqStatus = (payload) => {
    return this.http.put<ManageUser>(AppConfig.changeFaqStatus, payload).pipe(map(result => {
      return result;
    }));
  };

  /* Delete Faq */
  deleteFaq = (payload) => {
    return this.http.delete<ManageUser>(AppConfig.deleteFaq + payload).pipe(map(result => {
      return result;
    }));
  };

  /* Get Faq By ID */
  getFaqById = (payload) => {
    return this.http.get<ManageUser>(AppConfig.getFaqById + payload).pipe(map(result => {
      return result;
    }));
  };

  /*Get Faq Topic List*/
  getFaqTopicList = () => {
    return this.http.get<ManageUser>(AppConfig.getFaqTopicList).pipe(map(result => {
      return result;
    }));
  };

  /* Update Faq */
  updateFaq = (id, payload) => {
    return this.http.put<ManageUser>(AppConfig.updateFaq + id, payload).pipe(map(result => {
      return result;
    }));
  };

  /* Create New Faq*/
  createNewFaq = (payload) => {
    return this.http.post<ManageUser>(AppConfig.createNewFaq, payload).pipe(map(result => {
      return result;
    }));
  };
}
