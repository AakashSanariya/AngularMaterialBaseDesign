import {Component, OnInit, TemplateRef} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {EncrDecrService} from "../../_services/encr-decr.service";
import {AppConfig} from "../../config/app-config";
import {MatDialog} from "@angular/material/dialog";
import {ManageUser} from "../../model/manage-user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private toaster: ToastrService,
              private router: Router,
              private EncrDecr: EncrDecrService,
              private dialog: MatDialog
  ) { }

  spinner: boolean = false;
  loginForm = new ManageUser();

  ngOnInit() {
  }
  
  onSubmit(payLoad){
    let addPayLoad = {
      email: payLoad.email,
      password: payLoad.password,
      role: 'ADMIN'
    };
    this.spinner = true;
    this.authService.userSignin(addPayLoad).subscribe(result => {
      if(result['meta'].status_code == 200){
        this.spinner = false;
        let encrypted = this.EncrDecr.set(AppConfig.EncrDecrKey, result['data'].access_token);
        localStorage.setItem('token', encrypted);
        localStorage.setItem('user_name', result['data'].user_detail.first_name + ' ' + result['data'].user_detail.last_name);
        this.toaster.success('Login Successfully');
        this.router.navigate(['dashboard']);
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("User Name and Password Not Match");
        this.router.navigate(['/login']);
      }
    });
  }

  /* Forgot Email Dialog */
  openForgotDialog = (templateRef: TemplateRef<any>) => {
    this.dialog.open(templateRef, {
      height: '300px',
      width: '400px',
    });
  };


  cancel = ():void => {
    // this.dialogRef.close();
  };

  /* Send Forgot Email*/
  onForgotEmail = (payload) => {
    this.spinner = true;
    this.authService.forgotPassword(payload).subscribe(result => {
      if(result){
        this.spinner = false;
        this.toaster.success("Password Reset Link Send into your email address");
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
      }
    });
  };

}
