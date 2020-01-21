import { Component, OnInit } from '@angular/core';
import {ManageUser} from "../../model/manage-user";
import {SettingsService} from "../../_services/settings.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AppConstant} from "../../config/app-constant";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService,
              private router: Router,
              private toaster: ToastrService
  ) { }

  spinner: boolean = true;
  EditDetails = new ManageUser();
  settingsData: any;
  logo_id: string;
  fav_id: string;
  ImageData: any;
  logoURL: any;
  faviconURL: any;


  ngOnInit() {
    this.getSettingsDetails();
    this.logoURL = 'assets/Image/brainvireLogo.png';
    this.faviconURL = 'assets/Image/brainvireFavicon.png';
  }

  /*get Settings Details*/
  getSettingsDetails = () => {
    this.settingsService.getSettingData().subscribe(result => {
      if(result){
        this.spinner = false;
        this.settingsData = result.data;
        let that=this;
        if(this.settingsData.length>0){
          this.settingsData.forEach(function(value, index){
            that.getValue(value.option_name,value.option_value,value.id);
          });
        }
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
        this.router.navigate(['/dashboard']);
      }
    });
  };

  getValue(name,value,id){
    switch(name) {
      case "site_name": {
        this.EditDetails.site_name=value;
        break;
      }
      case "tag_line": {
        this.EditDetails.tag_line=value;
        break;
      }
      case "default_language": {
        this.EditDetails.default_language=value;
        break;
      }
      case "support_email": {
        this.EditDetails.support_email=value;
        break;
      }
      case "contact_email": {
        this.EditDetails.contact_email=value;
        break;
      }
      case "contact_number": {
        this.EditDetails.contact_number=value;
        break;
      }
      case "address": {
        this.EditDetails.address=value;
        break;
      }
      case "logo": {
        this.logo_id = id;
        localStorage.setItem('logo_id_value', JSON.stringify(this.logo_id));
        break;
      }
      case "favicon": {
        this.fav_id = id;
        /* store value as string in localstorage for remove function */
        localStorage.setItem('fav_id_value', JSON.stringify(this.fav_id));
        break;
      }
      default: {
        console.log("Invalid choice");
        break;
      }
    }
  }

  /*Get Image Data*/
  getImageData = () => {
    this.settingsService.getImageData().subscribe(result => {
      if(result){
        this.spinner = false;
        this.ImageData = result.data;
        let sitename = result.data.site_name ? result.data.site_name : AppConstant.siteName;
        if(result.data.logo) {
          this.logoURL = result.data.logo;
        }
        if(result.data.favicon) {
          this.faviconURL = result.data.favicon;
          this.settingsService.changeFavicon(result.data.favicon32);
        }
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error('!Oops Some Error Occurs');
        this.router.navigate(['/dashboard']);
      }
    });
  };

  onSubmit = (payload) => {
    const formData: FormData = new FormData();
    formData.append('site_name', payload.site_name);
    formData.append('tag_line', payload.tag_line);
    formData.append('default_language', payload.default_language);
    formData.append('support_email', payload.support_email);
    formData.append('contact_email', payload.contact_email);
    formData.append('contact_number', payload.contact_number);
    formData.append('address', payload.address);
    /* Get Logo file */
    let fileLOGO = (<HTMLInputElement>document.getElementById("profile_logo")).files[0];
    /* Get Favicon file */
    let fileFAV = (<HTMLInputElement>document.getElementById("profile_favicon")).files[0];
    this.updateSettingsData(formData);
  };

  updateSettingsData = (payload) => {
    this.spinner = true;
    this.settingsService.saveSettingsData(payload).subscribe(result => {
      if (result) {
        this.spinner = false;
        this.toaster.success("Update Details Successfully");
        this.getSettingsDetails();
      }
    }, error => {
      if (error) {
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
        this.router.navigate(['/dashboard']);
      }
    });
  };

  /* Change Logo Image*/
  changeLogoImage = (event) => {
    if (event.target.files[0] != undefined) {
      let imageType = event.target.files[0].type;
      let imageSize = event.target.files[0].size;
      if(event.target.files.length > 0){
        if(imageSize <= 200000){
          if(imageType == 'image/jpeg' || imageType == 'image/png' || imageType == 'image/jpg'){
            var reader = new FileReader();
            reader.onload = (event:any) => {
              this.logoURL = event.target.result;
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
    }
  };

  /* Change Favcon Image*/
  changeFavImage = (event) => {
    if (event.target.files[0] != undefined) {
      let imageType = event.target.files[0].type;
      let imageSize = event.target.files[0].size;
      if(event.target.files.length > 0){
        if(imageSize <= 200000){
          if(imageType == 'image/jpeg' || imageType == 'image/png' || imageType == 'image/jpg'){
            var reader = new FileReader();
            reader.onload = (event:any) => {
              this.faviconURL = event.target.result;
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
    }
  };

}
