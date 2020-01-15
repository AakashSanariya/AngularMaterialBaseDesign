import { Component, OnInit } from '@angular/core';
import {ManageSubadminService} from "../../../_services/manage-subadmin.service";
import {ToastrService} from "ngx-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import {ManageUser} from "../../../model/manage-user";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-add-edit-subadmin',
  templateUrl: './add-edit-subadmin.component.html',
  styleUrls: ['./add-edit-subadmin.component.scss']
})
export class AddEditSubadminComponent implements OnInit {

  constructor(private subAdminService: ManageSubadminService,
              private toaster: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog
  ) { }

  roleList: any;
  roleName: string;
  spinner: boolean = true;
  EditDetails = new ManageUser();
  editId: string;
  displayPassword: boolean = false;

  ngOnInit() {
    this.listRole();

    this.route.paramMap.subscribe(param => {
      if(param.get('id') == null){
        this.displayPassword = true;
      }
      else{
        this.editId = param.get('id');
        this.findSubAdmin();
      }
    });

  }

  findSubAdmin = () => {
    if(this.editId){
      this.subAdminService.getSubAdminById(this.editId).subscribe(result => {
        if(result.meta.status_code == 200){
          this.EditDetails = result.data;
          /* Set Role Name*/
          this.EditDetails.roles.forEach(result => {
            this.roleName = result.name;
          });
        }
      });
    }
  };

  /* List of Role*/
  listRole = () => {
    this.subAdminService.getActivateUserRole().subscribe(result => {
      if(result.meta.status_code == 200){
        this.spinner = false;
        this.roleList = result.data;
      }
    }, error => {
      if(error){
        this.toaster.error(error.message);
        this.router.navigate(['/subadmin/list']);
      }
    });
  };

  dialogClose = () => {
    this.dialog.closeAll();
  };

  /* Form Submit*/
  onSubmit = (payload) => {
    this.spinner = true;
    if(this.editId == null){
      this.addNewSubadmin(payload); // add new function call
    }
    else{
      this.editSubadmin(payload); // edit function call
    }
  };

  /* Add new Sub Admin*/
  addNewSubadmin = (payload) => {
    let addPayload = new FormData();
    addPayload.append('first_name', payload.first_name);
    addPayload.append('last_name', payload.last_name);
    addPayload.append('email', payload.email);
    addPayload.append('username', payload.username);
    addPayload.append('password', payload.password);
    addPayload.append('role_id', payload.role_id);
    this.subAdminService.addNewSubadmin(addPayload).subscribe(result => {
      if(result){
        this.spinner = false;
        this.toaster.success("Sub Admin Add Successfully");
        this.router.navigate(['/subadmin/list']);
      }
    }, error => {
      if(error.message){
        this.spinner = false;
        this.toaster.error(error.message);
      }
    });
  };

  /* Edit Sub Admin Details*/
  editSubadmin = (payload) => {
    this.subAdminService.editSubAdmin(payload, this.editId).subscribe(result => {
      if(result){
        this.spinner = false;
        this.toaster.success("Sub Admin Update Successfully");
        this.router.navigate(['/subadmin/list']);
      }
    }, error => {
      if(error.message){
        this.spinner = false;
        this.toaster.error(error.message);
        this.router.navigate(['/subadmin/list']);
      }
    });
  }


}
