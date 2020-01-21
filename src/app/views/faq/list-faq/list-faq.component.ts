import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {FaqService} from "../../../_services/faq.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {ManageUser} from "../../../model/manage-user";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {AddEditFaqComponent} from "../add-edit-faq/add-edit-faq.component";

@Component({
  selector: 'app-list-faq',
  templateUrl: './list-faq.component.html',
  styleUrls: ['./list-faq.component.scss']
})
export class ListFaqComponent implements OnInit {

  constructor(private faqService: FaqService,
              private router: Router,
              private toaster: ToastrService,
              private dialog: MatDialog
  ) { }

  spinner: boolean = true;
  changeStatus: any;
  deleteFaqId: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  filterColumns: string[] = ['Sr_No', 'question', 'faq_topic', 'created_at', 'status', 'action'];
  displayedColumns: string[] = ['Sr_No', 'question', 'faq_topic', 'created_at', 'status', 'action'];
  dataSource: MatTableDataSource<ManageUser>;
  noRecords: boolean = false;

  ngOnInit() {
    this.faqService.getAllFaq().subscribe(result => {
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
  }

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

    if(this.dataSource.filteredData.length == 0){
      this.noRecords = true;
    } else {
      this.noRecords = false;
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };

  /* Add New FAQ*/
  openAddNew = () => {
    this.dialog.open(AddEditFaqComponent, {
      width: '600px',
      height: '550px',
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
  changeFaqStatus = () => {
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
    this.faqService.changeFaqStatus(payload).subscribe(result => {
      if(result){
        this.toaster.success("Faq Status Change Successfully");
        this.ngOnInit();
        this.dialog.closeAll();
      }
    }, error => {
      if(error){
        this.toaster.error("!Oops Some Error To Change Status");
        this.router.navigate(['/faq/list']);
      }
    });
  };

  /* Delete Dialog */
  openDeleteDialog = (templateRef: TemplateRef<any>, data) => {
    this.deleteFaqId = data.id;
    this.dialog.open(templateRef, {
      hasBackdrop: true,
    });
  };

  deleteFaqbyId = () => {
    this.faqService.deleteFaq(this.deleteFaqId).subscribe(result => {
      if(result){
        this.toaster.success("Delete Faq Successfully");
        this.router.navigate(['/faq/list']);
        this.ngOnInit();
        this.dialog.closeAll();
      }
    }, error => {
      if(error){
        this.toaster.error("!Oops Some Error To Delete Faq");
      }
    });
  };

}
