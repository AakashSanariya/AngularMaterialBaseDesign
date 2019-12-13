import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {ManageUserService} from "../../../_services/manage-user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {ManageUser} from "../../../model/manage-user";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  constructor(private manageUserService: ManageUserService,
              private route: Router,
              private toaster: ToastrService,
              public dialog: MatDialog
  ) { }

  spinner: boolean = true;
  changeStatus: any;
  changePasswordId: any;
  managePassword = new ManageUser();
  deleteUserId: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['fullname', 'username', 'email', 'gender', 'dateofBirth', 'phone_number', 'registered_at', 'last_updated_at', 'status', 'action'];
  dataSource: MatTableDataSource<ManageUser>;

  ngOnInit() {
    this.listingUser();
  }

  /*Listing Of User*/

  listingUser = () => {
    let payload = {};
    this.manageUserService.getManageUserList(payload).subscribe(result => {
      if(result.meta.status_code == 200){
        this.spinner = false;
        this.dataSource = new MatTableDataSource(result.data.original.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }, error => {
      if(error){
        this.toaster.error("!Oops Some Error Occurs");
        this.route.navigate(['/dashboard']);
      }
    });
  };

  /* Filter Apply */
  applyFilter = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };

  /* Filter Submit*/
  filterUser = (payload) => {
    this.spinner = true;
    let addPayload = {
      'fullname': payload.fullname,
      'email': payload.email,
      'status': payload.status,
      'gender': payload.gender,
      'phone_number': payload.phone_number
    };
    this.manageUserService.getManageUserList(addPayload).subscribe(result => {
      if(result.meta.status_code == 200){
        this.spinner = false;
        this.dataSource = new MatTableDataSource(result.data.original.data);
      }
    }, error => {
      if(error.message){
        this.spinner = false;
        this.toaster.error(error.meta.message);
      }
    });
  };

  /* Status Change Dialog*/
  openDialog = (templateRef: TemplateRef<any>, data) => {
    this.changeStatus = data;
    this.dialog.open(templateRef, {
      width: '600'
    });
  };

  cancel = ():void => {
    // this.dialogRef.close();
  };

  /* Status change Click*/
  changeUserStatus = () => {
    let id = this.changeStatus.id;
    let status = this.changeStatus.status;
    let payload = {};
    if(status == 'Active'){
      payload = {
        'id': id,
        'status': 'Inactive'
      };
    }
    else{
      payload = {
        'id': id,
        'status': 'Active'
      }
    }
    this.manageUserService.changeManageUserStatus(payload).subscribe(result => {
      if(result){
        this.toaster.success("User Status Change Successfully");
        this.dataSource.paginator.firstPage();
        this.dialog.closeAll();
      }
    }, error => {
      if(error){
        this.toaster.error("!Oops Some Error To Change Status");
        this.route.navigate(['/user/list']);
      }
    });
  };

  /* Change Password Dialog box*/
  openchangePassword = (templateRef: TemplateRef<any>, data) => {
    this.changePasswordId = data;
    this.dialog.open(templateRef, {
      height: '400px',
      width: '600px',
    });
  };

  /* New Password Set*/
  newPassword = (payload) => {
    let addPayload = new FormData();
    addPayload.append('user_id', this.changePasswordId.id);
    addPayload.append('new_password', payload.password);
    addPayload.append('confirm_password', payload.confirmPassword);
    this.manageUserService.changeUserPassword(addPayload).subscribe(result => {
      if(result){
        this.toaster.success('Password Change Successfully');
        this.dialog.closeAll();
      }
    }, error => {
      if(error){
        this.toaster.error('!Oops Some Error To Password can not Change');
        this.route.navigate(['/user/list']);
      }
    });
  };

  /* Delete Dialog */
  openDeleteDialog = (templateRef: TemplateRef<any>, data) => {
    this.deleteUserId = data.id;
    this.dialog.open(templateRef, {});
  };

  deleteUserbyId = () => {
    this.manageUserService.deleteUser(this.deleteUserId).subscribe(result => {
      if(result){
        this.toaster.success("Delete User Successfully");
        this.route.navigate(['/user/list']);
        this.dataSource.paginator.firstPage();
        this.dialog.closeAll();
      }
    }, error => {
      if(error){
        this.toaster.error("!Oops Some Error To Delete User");
      }
    });
  };
}
