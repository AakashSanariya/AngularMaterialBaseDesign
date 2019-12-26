import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncrDecrService } from '../_services/encr-decr.service';
import {AppConfig} from "../config/app-config";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private EncrDecr: EncrDecrService){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let decrypted = localStorage.getItem('token');
        if(decrypted){
            let currentUser = JSON.parse(this.EncrDecr.get(AppConfig.EncrDecrKey, decrypted));
            if (currentUser && currentUser.access_token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: 'Bearer' + ' ' + currentUser.access_token
                    }
                });
            }
        }

        return next.handle(request);
    }
}