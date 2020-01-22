import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ManageUserService} from "../../../_services/manage-user.service";
import {ToastrService} from "ngx-toastr";
import {ManageUser} from "../../../model/manage-user";

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private manageUserService: ManageUserService,
              private toaster: ToastrService
  ) { }

  profileId: any;
  userProfile = new ManageUser();
  spinner: boolean = true;
  imageUrl: any;

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      if(param.get('id') == null){
        this.router.navigate(['/user/list']);
        this.toaster.error("!Oops Some Error Occurs");
      }
      else{
        this.profileId = param.get('id');
        this.manageUserService.getUserById(this.profileId).subscribe(result => {
          if(result){
            this.spinner = false;
            this.userProfile = result.data;
            this.imageUrl = result.data.profile_image;
            // console.log(this.userProfile);
          }
        }, error => {
          if(error){
            this.spinner = false;
            this.toaster.error("!Oops Some Error Occurs");
            this.router.navigate(['/user/list']);
          }
        });
      }
    });
  }

}
