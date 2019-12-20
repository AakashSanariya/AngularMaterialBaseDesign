import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {ManageSubadminService} from "../../../_services/manage-subadmin.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ManageUser} from "../../../model/manage-user";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-list-subadmin',
  templateUrl: './list-subadmin.component.html',
  styleUrls: ['./list-subadmin.component.scss']
})
export class ListSubadminComponent implements OnInit {


  /* Mat Table */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['First_Name', 'Last_Name', 'Email', 'Status', 'Action'];
  dataSource: MatTableDataSource<ManageUser>;

  constructor(private subAdminService: ManageSubadminService,
              private toaster: ToastrService,
              private route: Router,
              public dialog: MatDialog
  ) { }

  activeRole: any;
  spinner: boolean = true;
  managePassword = new ManageUser();
  changeData:any;
  changePasswordId: any;
  deleteSubadminId: any;
  
  ngOnInit() {

    /* User Active Role*/
    this.subAdminService.getActivateUserRole().subscribe(result => {
      if(result.meta.status_code == 200){
        this.activeRole = result.data;
      }
    }, error => {
      if(error.meta){
        this.toaster.error(error.meta.message);
        this.route.navigate(['/dashboard']);
      }
    });

    /* User Listing */
    this.subAdminList();
  }

  /* Sub Admin Listing */
  subAdminList = () => {
    let payload = {};
    this.subAdminService.getSubadmin(payload).subscribe(result => {
      if(result.meta.status_code == 200){
        this.spinner = false;
        this.dataSource = new MatTableDataSource(result.data.original.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }, error => {
      if(error['message']){
        this.spinner = false;
        this.toaster.error(error['message']);
        this.route.navigate(['/dashboard']);
      }
    });
  };

  applyFilter = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };


  /* Filter Submit*/
  filtersubAdmin = (payload) => {
    this.spinner = true;
    let addPayload = {
      'fullname': payload.fullname,
      'email': payload.email,
      'status': payload.status,
      'role': payload.role
    };
    this.subAdminService.filterSubaadmin(addPayload).subscribe(result => {
      if(result.meta.status_code == 200){
        this.spinner = false;
        this.dataSource = new MatTableDataSource(result.data.original.data);
      }
    }, error => {
      if(error.message){
        this.spinner = false;
        this.toaster.error(error.message);
      }
    });
  };
  
  /* Status Change Of Sub Admin*/
  openDialog = (templateRef: TemplateRef<any>, data) => {
    this.changeData = data;
    this.dialog.open(templateRef, {
      width: '600'
    });
  };

  cancel = ():void => {
    // this.dialogRef.close();
  };

  /* Change Sub Admin Status*/
  changeStatus = () => {
    let id = this.changeData.id;
    let status = this.changeData.status;
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
    this.subAdminService.changeSubAdminStatus(payload).subscribe(result => {
      if(result){
        this.toaster.success("User Status Change Successfully");
        this.ngOnInit();
        this.dialog.closeAll();
      }
    }, error => {
      if(error){
        this.toaster.error("!Oops Some Error To Change Status");
        this.route.navigate(['/subadmin/list']);
      }
    });
  };

  /* Password Change*/
  openchangePassword = (templateRef: TemplateRef<any>, data) => {
    this.changePasswordId = data;
    this.dialog.open(templateRef, {
      height: '400px',
      width: '600px',
    });
  };

  newPassword = (payload) => {
    let addPayload = new FormData();
    addPayload.append('new_password', payload.password);
    addPayload.append('confirm_password', payload.confirmPassword);
    addPayload.append('user_id', this.changePasswordId.id);
    this.subAdminService.paswordChange(addPayload).subscribe(result => {
      if(result){
        this.toaster.success('Password Change Successfully');
        this.ngOnInit();
        this.dialog.closeAll();
      }
    }, error => {
      if(error){
        this.toaster.error('!Oops Some Error To Password can not Change');
        this.route.navigate(['/subadmin/list']);
      }
    });
  };

  /* Delete Dialog */
  openDeleteDialog = (templateRef: TemplateRef<any>, data) => {
    this.deleteSubadminId = data.id;
    this.dialog.open(templateRef, {});
  };

  deleteSubAdmin = () => {
    this.subAdminService.deleteSubadmin(this.deleteSubadminId).subscribe(result => {
      if(result){
        this.toaster.success("Delete User Successfully");
        this.route.navigate(['/subadmin/list']);
        this.ngOnInit();
        this.dialog.closeAll();
      }
    }, error => {
      if(error){
        this.toaster.error("!Oops Some Error To Delete User")
      }
    });
  }
}