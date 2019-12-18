import {Component, OnInit, ViewChild} from '@angular/core';
import {EmailTemplateService} from "../../../_services/email-template.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ManageUser} from "../../../model/manage-user";

@Component({
  selector: 'app-list-email',
  templateUrl: './list-email.component.html',
  styleUrls: ['./list-email.component.scss']
})
export class ListEmailComponent implements OnInit {

  constructor(private emailTemplateService: EmailTemplateService,
              private router: Router,
              private toaster: ToastrService
  ) { }

  spinner: boolean = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['SrNo', 'email_subject', 'status', 'action'];
  dataSource: MatTableDataSource<ManageUser>;

  ngOnInit() {
    this.listEmailTemplate();
  }

  /* List All Email Templates */
  listEmailTemplate = () => {
    this.emailTemplateService.getAllEmailTemplate().subscribe(result => {
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

  /* Filter Apply */
  applyFilter = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };

}
