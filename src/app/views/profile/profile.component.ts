import { Component, OnInit } from '@angular/core';
import {ManageUser} from "../../model/manage-user";
import {ProfileService} from "../../_services/profile.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private profileServide: ProfileService,
              private authService: AuthService,
              private router: Router,
              private toaster: ToastrService
  ) { }

  EditDetails = new ManageUser();
  spinner: boolean = true;

  ngOnInit() {
    this.getProfileDetails();
  }

  /*get Profile Details*/
  getProfileDetails = () => {
    this.profileServide.getUserProfileDetails().subscribe(result => {
      if(result){
        this.spinner = false;
        this.EditDetails = result.data;
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
        this.router.navigate(['/dashboard']);
      }
    });
  };

  /* Save Click*/
  onSubmit = (payload) => {
    this.updateProfileDetails(payload);
  };

  /* Update Profile Details*/
  updateProfileDetails = (payload) => {
    this.spinner = true;
    this.profileServide.updateProfile(payload).subscribe(result => {
      if(result){
        this.spinner = false;
        this.toaster.success("User Profile Update Successfully");
        this.ngOnInit();
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
        this.router.navigate(['/profile']);
      }
    });
  };

  /* Change Password*/
  changePassword = (payload) => {
    let addPayload = {
      old_password: payload.oldPassword,
      new_password: payload.newPassword,
      confirm_password: payload.confirmPassword
    };

    this.spinner = true;
    this.profileServide.changeUserPassword(addPayload).subscribe(result => {
      if(result){
        this.spinner = false;
        this.toaster.success("Password Update Successfully");
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }, error => {
      if(error.meta.message_code == "OLD_PASSWORD_NOT_MATCH"){
        this.spinner = false;
        this.toaster.error(error.meta.message);
      }
      else{
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
      }
    });
  }
}
