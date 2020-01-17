import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {ManageUserService} from "../../../_services/manage-user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {ManageUser} from "../../../model/manage-user";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {AddEditUserComponent} from "../add-edit-user/add-edit-user.component";

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
  pass: any; conPass:any;
  deleteUserId: any;
  filterFormDetails = new ManageUser();
  status: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  filterColumns: string[] = ['Sr_No', 'fullname', 'username', 'email', 'gender', 'date_of_birth', 'phone_number', 'created_at', 'updated_at', 'status', 'action'];
  displayedColumns: string[] = ['Sr_No', 'fullname', 'username', 'email', 'gender', 'date_of_birth', 'phone_number', 'created_at', 'updated_at', 'status', 'action'];
  dataSource: MatTableDataSource<ManageUser>;

  /*For pagination*/
  totalNoRecord: number;
  startRecord: number = 0;
  pageIndex: number;
  pageSize: number = 5;

  ngOnInit() {
    this.listingUser();
  }

  /*Listing Of User*/

  listingUser = () => {
    let payload = {
      length: this.pageSize,
      start: this.startRecord
    };
    this.manageUserService.getManageUserList(payload).subscribe(result => {
      if(result.meta.status_code == 200){
        this.spinner = false;
        this.dataSource = new MatTableDataSource(result.data.original.data);
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalNoRecord = result.data.original.recordsTotal;
      }
    }, error => {
      if(error){
        this.toaster.error("!Oops Some Error Occurs");
        this.route.navigate(['/dashboard']);
      }
    });
  };

  /* server Side Pagination*/
  onPagination = (event) => {
    this.pageSize = event.pageSize;
    this.startRecord = event.pageIndex * this.pageSize;
    this.listingUser();
  };

  /* Filter Display Columns*/
  removeColumn(event) {
    let index = this.displayedColumns.indexOf(event);
    if(index != -1){
      this.displayedColumns.splice(index, 1);
    }
  }

  /* Filter Apply */
  applyFilter = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };

  /*Custom Filter Dialog*/
  customFilterDialog = (templateRef: TemplateRef<any>) => {
    this.dialog.open(templateRef, {
      width: '550px',
      height: '450px',
      hasBackdrop: true
    });
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
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dialog.closeAll();
      }
    }, error => {
      if(error.message){
        this.spinner = false;
        this.toaster.error(error.meta.message);
      }
    });
  };

  resetForm = (filterForm) => {
    filterForm.reset();
    this.dialog.closeAll();
    this.ngOnInit();
  };

  /* Add New User*/
  openAddNew = () => {
    this.dialog.open(AddEditUserComponent, {
      width: '650px',
      height: '650px',
      hasBackdrop: true
    });

  };

  /* Status Change Dialog*/
  openDialog = (templateRef: TemplateRef<any>, data) => {
    this.changeStatus = data;
    this.dialog.open(templateRef, {
      width: '600',
      hasBackdrop: true
    });
  };

  cancel = ():void => {
    this.ngOnInit();
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
        this.ngOnInit();
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
      hasBackdrop: true,
    });
  };

  /* New Password Set*/
  newPassword = (payload) => {
    let addPayload = {
      'user_id': this.changePasswordId.id,
      'new_password': payload.password,
      'confirm_password': payload.confirmPassword
    };
    this.spinner = true;
    this.manageUserService.changeUserPassword(addPayload).subscribe(result => {
      if(result){
        this.spinner = false;
        this.toaster.success('Password Change Successfully');
        this.ngOnInit();
        this.dialog.closeAll();
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error('!Oops Some Error To Password can not Change');
        this.route.navigate(['/user/list']);
      }
    });
  };

  /* Delete Dialog */
  openDeleteDialog = (templateRef: TemplateRef<any>, data) => {
    this.deleteUserId = data.id;
    this.dialog.open(templateRef, {
      hasBackdrop: true,
    });
  };

  deleteUserbyId = () => {
    this.manageUserService.deleteUser(this.deleteUserId).subscribe(result => {
      if(result){
        this.toaster.success("Delete User Successfully");
        this.route.navigate(['/user/list']);
        this.ngOnInit();
        this.dialog.closeAll();
      }
    }, error => {
      if(error){
        this.toaster.error("!Oops Some Error To Delete User");
      }
    });
  };
}
