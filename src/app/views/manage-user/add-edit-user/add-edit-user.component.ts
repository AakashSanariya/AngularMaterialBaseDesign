import { Component, OnInit } from '@angular/core';
import {ManageUser} from "../../../model/manage-user";
import {ImageCroppedEvent} from "ngx-image-cropper/ngx-image-cropper";
import {ToastrService} from "ngx-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import {ManageUserService} from "../../../_services/manage-user.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {

  constructor(private toaster: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private manageUserService: ManageUserService,
              private DatePipe: DatePipe
  ) { }

  editId: any;
  EditDetails = new ManageUser();
  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropped_image: any;
  displayPassword: boolean = true;
  newPassword: boolean = false;
  newEmail: boolean = false;
  noPicture: boolean = false;
  isRemoveAPI: boolean = false;
  maxDate = new Date();
  spinner = false;
  disabled: boolean = false;
  emailRequired: boolean = false;

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      if(param.get('id') == null){
        this.displayPassword = true;
        this.emailRequired = true;
      }
      else{
        this.editId = param.get('id');
        this.findUser()
      }
    });
  }

  /*Finding User For Edit Details*/
  findUser = () => {
    if(this.editId){
      this.manageUserService.getUserById(this.editId).subscribe(result => {
        if(result){
          this.EditDetails = result.data;
          this.disabled = true;
          this.displayPassword = false;
        }
      }, error => {
        if(error.meta.message){
          this.toaster.error(error.meta.message);
        }
      });
    }
  };

  /* Image Upload*/
  onChange = (event) => {
    let image = event;
    let imageType = event.target.files[0].type;
    let imageSize = event.target.files[0].size;
    if(event.target.files.length > 0){
      if(imageSize <= 20000){
        if(imageType == 'image/jpeg' || imageType == 'image/png' || imageType == 'image/jpg'){
          var reader = new FileReader();
          reader.onload = (event:any) => {
            this.noPicture = true;
            this.isRemoveAPI=false;
            this.imageChangedEvent = image;
          };
          reader.readAsDataURL(event.target.files[0]);
        }
        else{
          this.toaster.error("Only jpeg, png and jpg Image Supported");
        }
      }
      else{
        this.toaster.error('Image Size Should be smaller than 2 Mb');
      }
    }

  };

  imageCropped(event: ImageCroppedEvent ){
    this.croppedImage = event.base64;
    this.cropped_image=event.file;
  }

  /*
   * This three function gives always a definition
   * because other wise it gives error
   * by default function definition get
   * */
  imageLoaded = () => {
  };
  cropperReady = () => {
  };
  loadImageFailed = () => {
  };

  /*On Submit Form */
  onSubmit = (payload) => {

    /* Date Convert in yyyy-MM-DD Format*/
    let date_format = this.DatePipe.transform(payload.date_of_birth, 'yyyy-MM-dd');

    /* Image add in Payload */
    const addPayload = new FormData();
    addPayload.append('first_name', payload.first_name);
    addPayload.append('last_name', payload.last_name);
    addPayload.append('username', payload.username);
    addPayload.append('date_of_birth', date_format);
    addPayload.append('gender', payload.gender);
    addPayload.append('phone_number', payload.phone_number);
    if(this.editId == null){
      addPayload.append('email', payload.email);
      addPayload.append('password', payload.password);
    }

    let file = (<HTMLInputElement>document.getElementById("profile_image")).files[0];
    if(file){
      addPayload.append('profile_image', file);
    }
    if(this.editId == null){
      this.addNewUser(addPayload);
    }
    else{
      this.editUser(addPayload);
    }
  };

  /* Add New User*/
  addNewUser = (payload) => {
    console.log(payload);
    this.spinner = true;
    this.manageUserService.addNewUser(payload).subscribe(result => {
      this.spinner = false;
      if(result){
        this.toaster.success("user Insert Successfully");
        this.router.navigate(['/user/list']);
      }
    }, error => {
      if(error.meta.message){
        this.spinner = false;
        this.toaster.error(error.meta.message);
        this.router.navigate(['user/list']);
      }
    });
  };

  /* Edit User Details*/
  editUser = (payload) => {
    this.spinner = true;
    this.manageUserService.updateUser(payload, this.editId).subscribe(result => {
      this.spinner = false;
      if(result){
        this.toaster.success("Updated User Details");
        this.router.navigate(['/user/list']);
      }
    }, error => {
      if(error){
        this.toaster.error("!Oops Some Error Occurs");
        this.router.navigate(['/user/list']);
      }
    });
  }

}
