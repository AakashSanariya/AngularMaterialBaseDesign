import {Component, OnInit, ViewChild} from '@angular/core';
import {ManageSubadminService} from "../../../_services/manage-subadmin.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ManageUser} from "../../../model/manage-user";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-list-subadmin',
  templateUrl: './list-subadmin.component.html',
  styleUrls: ['./list-subadmin.component.scss']
})
export class ListSubadminComponent implements OnInit {


  /* Mat Table */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['First Name', 'Last Name', 'Email', 'Status'];
  dataSource: MatTableDataSource<ManageUser>;

  constructor(private subAdminService: ManageSubadminService,
              private toaster: ToastrService,
              private route: Router
  ) { }

  subAdminList: ManageUser;
  spinner: boolean = true;
  
  ngOnInit() {
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
        this.spinner = false
        this.toaster.error(error['message']);
        this.route.navigate(['/dashboard']);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
