import { Component, OnInit } from '@angular/core';
import {CmsService} from "../../../_services/cms.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ManageUser} from "../../../model/manage-user";
import {AngularEditorConfig} from "@kolkov/angular-editor/public-api";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-add-edit-cms',
  templateUrl: './add-edit-cms.component.html',
  styleUrls: ['./add-edit-cms.component.scss']
})
export class AddEditCMSComponent implements OnInit {

  constructor(private cmsManagementService: CmsService,
              private toaster: ToastrService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog
  ) { }

  editId: any;
  description = null;
  spinner: boolean;
  EditDetails = new ManageUser();
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '200px',
    maxHeight: 'auto',
    width: '90%',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter Content here...',
    defaultParagraphSeparator: '',
    uploadUrl: 'assets/Image',
    sanitize: true,
    toolbarPosition: 'top',
  };

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      if(param.get('id') == null){
        this.description = true;
      }
      else {
        this.editId = param.get('id');
        this.editCMSDetails();
      }
    });
  }

  /* Find Details OF CMS*/
  editCMSDetails = () => {
    this.spinner = true;
    this.cmsManagementService.findCMSById(this.editId).subscribe(result => {
      if(result){
        this.spinner = false;
        this.EditDetails = result.data;
        this.description = result.data.description;
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error('!Oops Some Error Occurs');
        this.router.navigate(['/cmsmanagement/list']);
      }
    });
  };
  
  /* Form Submit*/
  onSubmit = (payload) => {
    if(this.editId == null){
      this.addNewCMS(payload);
    }
    else{
     this.editCMS(payload);
    }
  };

  /* Edit Details Of CMS*/
  editCMS = (payload) => {
    this.spinner = true;
    console.log(payload);
    this.cmsManagementService.updateCms(payload, this.editId).subscribe(result => {
      if(result){
        this.spinner = false;
        this.toaster.success("Details Update Successfully");
        this.router.navigate(['/cmsmanagement/list']);
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
        this.router.navigate(['cmsmanagement/list']);
      }
    });
  };

  dialogClose = () => {
    this.dialog.closeAll();
  };

  /* Add New CMS*/
  addNewCMS = (payload) => {
    this.spinner = true;
    this.cmsManagementService.addNewCms(payload).subscribe(result => {
      if(result){
        this.spinner = false;
        this.toaster.success("CMS Add Successfully");
        this.router.navigate(['cmsmanagement/list']);
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
        this.router.navigate(['cmsmanagement/list']);
      }
    });
  };
}
