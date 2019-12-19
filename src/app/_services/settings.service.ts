import {Injectable, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../config/app-config";
import {map} from "rxjs/internal/operators/map";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient,
              @Inject(DOCUMENT) private document: HTMLDocument
  ) { }

  /*get Image Data*/
  getImageData = () => {
    return this.http.get<any>(AppConfig.getImageData).pipe(map(result => {
      return result;
    }));
  };

  /* Change Favicon*/
  changeFavicon = (href:string) : void  => {
    this.document.getElementById('appFavicon').setAttribute('href', href);
  };

  /* Get setting Data*/
  getSettingData = () => {
    return this.http.post<any>(AppConfig.getSettingData, {}).pipe(map(result => {
      return result;
    }));
  };
  
  /* Save Settings Data*/
  saveSettingsData = (payload) => {
    return this.http.post<any>(AppConfig.saveSettingData, payload).pipe(map(result => {
      return result;
    }));
  };
  
}
