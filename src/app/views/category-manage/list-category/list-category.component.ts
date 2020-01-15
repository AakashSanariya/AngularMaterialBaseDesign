import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {CategoryManageService} from "../../../_services/category-manage.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ManageUser} from "../../../model/manage-user";
import {MatDialog} from "@angular/material/dialog";
import {AddEditCategoryComponent} from "../add-edit-category/add-edit-category.component";

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  constructor(private categoryManageService: CategoryManageService,
              private router: Router,
              private toaster: ToastrService,
              public dialog: MatDialog
  ) { }

  spinner: boolean = true;
  changeStatus: any;
  deleteUserId: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  filterColumns: string[] = ['Sr_No', 'name', 'parent_name', 'status', 'action'];
  displayedColumns: string[] = ['Sr_No', 'name', 'parent_name', 'status', 'action'];
  dataSource: MatTableDataSource<ManageUser>;

  ngOnInit() {
    this.categoryManageService.getAllCategory().subscribe(result => {
      if(result){
        this.spinner = false;
        this.dataSource = new MatTableDataSource(result.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error('!Oops Some Error Occurs');
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

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };

  /* Add New List Category*/
  openAddNew = () => {
    this.dialog.open(AddEditCategoryComponent, {
      width: '600px',
      height: '370px',
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
  changeCategoryStatus = () => {
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
    this.categoryManageService.changeCategoryStatus(payload).subscribe(result => {
      if(result){
        this.toaster.success("User Status Change Successfully");
        this.ngOnInit();
        this.dialog.closeAll();
      }
    }, error => {
      if(error){
        this.toaster.error("!Oops Some Error To Change Status");
        this.router.navigate(['/category/list']);
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

  deleteCategorybyId = () => {
    this.categoryManageService.deleteCategoryById(this.deleteUserId).subscribe(result => {
      if(result){
        this.toaster.success("Delete User Successfully");
        this.router.navigate(['/category/list']);
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
