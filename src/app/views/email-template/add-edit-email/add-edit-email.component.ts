import { Component, OnInit } from '@angular/core';
import {EmailTemplateService} from "../../../_services/email-template.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ManageUser} from "../../../model/manage-user";

@Component({
  selector: 'app-add-edit-email',
  templateUrl: './add-edit-email.component.html',
  styleUrls: ['./add-edit-email.component.scss']
})
export class AddEditEmailComponent implements OnInit {

  constructor(private emailTemplateService: EmailTemplateService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toaster: ToastrService
  ) { }
  
  spinner: boolean;
  email_body = null;
  editId: any;
  EditDetails = new ManageUser();

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      if(param.get('id') == null){
        
      }
      else{
        this.editId = param.get('id');
        this.getEmailById();
      }
    });
  }
  
  /* Get Email By ID*/
  getEmailById = () => {
    this.spinner = true;
    this.emailTemplateService.getEmailTemplateById(this.editId).subscribe(result => {
      if(result){
        this.spinner = false;
        this.EditDetails = result.data;
        this.email_body = result.data.email_body;
        console.log(this.EditDetails);
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
        this.router.navigate(['/emailtemplate/list']);
      }
    });
  }
  
  /* On Submit Click */
  onSubmit = (payload) => {
    if(this.editId == null){
      
    }
    else{
      this.updateEmail(payload);  
    }
  };
  
  
  /*Update Email Details*/
  updateEmail = (payload) => {
    this.spinner = true;
    this.emailTemplateService.updateEmailTemplate(this.editId, payload).subscribe(result => {
      this.spinner = false;
      this.toaster.success("Email Template Update Successfully");
      this.router.navigate(['/emailtemplate/list']);
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs While Update");
        this.router.navigate(['/emailtemplate/list']);
      }
    });
  }
}
