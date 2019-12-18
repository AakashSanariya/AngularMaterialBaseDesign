import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ManageUser} from "../model/manage-user";
import {AppConfig} from "../config/app-config";
import {map} from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class CategoryManageService {

  constructor(private http: HttpClient) { }
  
  /* Listing a Category */
  getAllCategory = () => {
    return this.http.get<ManageUser>(AppConfig.getallCategory).pipe(map(result => {
      return result;
    }));
  };
  

  /* Chage Status Of category*/
  changeCategoryStatus = (payload) => {
    return this.http.put<ManageUser>(AppConfig.changeCategoryStatus, payload).pipe(map(result => {
      return result;
    }))
  };

  /* Delete category */
  deleteCategoryById = (payload) => {
    return this.http.delete<ManageUser>(AppConfig.deleteCategoryById + payload).pipe(map(result => {
      return result;
    }));
  };
  
  /*Find category by Id*/
  findCategoryById = (payload) => {
    return this.http.get<ManageUser>(AppConfig.findCategoryById + payload).pipe(map(result => {
      return result;
    }));
  };

  /* Find Parent Category By Id and Name*/
  findParentCategoryById  = (id, name) => {
    return this.http.get<ManageUser>(AppConfig.findParentCategory + id + '/' + name).pipe(map(result => {
      return result;
    }));
  };

  /* Update Category*/
  updateCategoryById = (id, payload) => {
    return this.http.put<ManageUser>(AppConfig.updateCategory + id, payload).pipe(map(result => {
      return result;
    }));
  };

  /* New Category Add*/
  createNewCategory = (payload) => {
    return this.http.post<ManageUser>(AppConfig.createCategory, payload).pipe(map(result => {
      return result;
    }));
  };

  getCategoryTreeView = () => {
    return this.http.get<ManageUser>(AppConfig.getCategoryTreeView).pipe(map(result => {
      return result;
    }));
  };
  
}
