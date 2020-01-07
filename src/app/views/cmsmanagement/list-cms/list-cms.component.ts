import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {CmsService} from "../../../_services/cms.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ManageUser} from "../../../model/manage-user";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-list-cms',
  templateUrl: './list-cms.component.html',
  styleUrls: ['./list-cms.component.scss']
})
export class ListCmsComponent implements OnInit {

  constructor(private cmsManagementService: CmsService,
              private router: Router,
              private toaster: ToastrService,
              public dialog: MatDialog
  ) { }

  listCmsDetails: any;

  /* Mat Table */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  filterColumns: string[] = ['SrNo', 'page_title', 'Status', 'Action'];
  displayedColumns: string[] = ['SrNo', 'page_title', 'Status', 'Action'];
  dataSource: MatTableDataSource<ManageUser>;

  spinner: boolean = true;
  changeData: any;

  ngOnInit() {
    this.listingCMS();
  }

  /* Listing CMS Management */
  listingCMS = () => {
    this.cmsManagementService.getAllCMS().subscribe(result => {
      if(result){
        this.spinner = false;
        this.dataSource = new MatTableDataSource(result.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
        this.router.navigate(['/dashboard']);
      }
    });
  };

  /* Filter Display Columns*/
  removeColumn(event) {
    let index = this.displayedColumns.indexOf(event);
    if(index != -1){
      this.displayedColumns.splice(index, 1);
    }
  }

  /* Angular Material Search */
  applyFilter = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };

  /* Status Change Of CMS Management*/
  openDialog = (templateRef: TemplateRef<any>, data) => {
    this.changeData = data;
    this.dialog.open(templateRef, {
      width: '600',
      hasBackdrop: true
    });
  };

  cancel = ():void => {
    this.ngOnInit();
  };

  /* Change CMS Status*/
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
    this.cmsManagementService.changeCMSStatus(payload).subscribe(result => {
      if(result){
        this.toaster.success("User Status Change Successfully");
        this.ngOnInit();
        this.dialog.closeAll();
      }
    }, error => {
      if(error){
        this.toaster.error("!Oops Some Error To Change Status");
        this.router.navigate(['/cmsmanagement/list']);
      }
    });
  };

}
