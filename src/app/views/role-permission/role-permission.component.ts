import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {RolePermissionService} from "../../_services/role-permission.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ManageUser} from "../../model/manage-user";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {TreeviewItem} from "ngx-treeview/src/treeview-item";
import {TreeviewConfig} from "ngx-treeview/src/treeview-config";
import {MatDialog} from "@angular/material/dialog";
import {MatTreeFlattener, MatTreeFlatDataSource} from "@angular/material/tree";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss']
})
export class RolePermissionComponent implements OnInit {

  constructor(private rolePermissionService: RolePermissionService,
              private router: Router,
              private toaster: ToastrService,
              private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllRoleList();
  }

  listRole: any;
  spinner: boolean = true;
  currRoleId: number;
  changeStatus: any;
  editRoleId: any;
  roleName: string;
  editRoleDialog = new ManageUser();

  treeViewData: any[];
  values: any = [];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  filterColumns: string[] = ['Sr_No', 'name', 'status', 'action'];
  displayedColumns: string[] = ['Sr_No', 'name', 'status', 'action'];
  dataSource: MatTableDataSource<ManageUser>;

  /*get All Roll List*/
  getAllRoleList = () => {
    this.rolePermissionService.getAllRoleList().subscribe(result => {
      if(result){
        this.spinner = false;
        this.dataSource = new MatTableDataSource(result.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.listRole= result.data;

        if(this.listRole.length) {
          this.currRoleId = result.data[0].id;
          this.getAllPermissionList(this.currRoleId);
        } else {
          this.currRoleId = null;
        }
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

  /* Filter Apply */
  applyFilter = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };
  
  /* Get All Permission List*/
  getAllPermissionList = (id) => {
    this.spinner = true;
    const items: any = [];
    if (!id) {
      this.items = items;
      return;
    }
    let newArray = [];
    this.rolePermissionService.getAllPermissionList(id).subscribe(result => {
      if(result){
        this.spinner = false;
        this.treeViewData = result.data;
        /* Making as per need for material tree view using response of api */
        for (let permission of this.treeViewData) {
          if (permission.parent == "#") {
            newArray[permission.id] = { 'text': permission.text, 'value': null, 'children': [] };
          } else {
            newArray[permission.parent].children.push({ 'text': permission.text, 'value': permission.id, 'checked': permission.state.selected });
          }
        }
        /* Making as per need for material tree view using response of api */
        for (let par in newArray) {
          const item = (newArray[par]);
          items.push(item);
          /*For Old Selected Values Array*/
          item.children.forEach(result => {
            if(result.checked == true){
              this.values.push(result.value)
            }
          });
        }
        this.items.data = items; // material tree node data binding after _transform call()
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
        this.router.navigate(['/dashboard']);
      }
    });
  };

  /*Material Tree View Method Required*/
  private _transformer = (node: any, level: number) => {
    // console.log({
    //   expandable: !!node.children,
    //   name: node.text,
    //   checked: node.checked,
    //   data: node,
    //   level: level,
    // }, node);
    return {
      expandable: !!node.children,
      name: node.text,
      checked: node.checked,
      data: node,
      level: level,
    }
  };

  treeControl = new FlatTreeControl<any>(
      node => node.level, node => node.expandable);

  /* Parameter
      1) Transform method as parameter
      2) Level Of Children
      3) Expandable or not
      4) children
  */
  treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);

  items = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener); //items Mat Tree Object

  /* Material Tree View Method Required*/
  hasChild = (_: number, node: any) => node.expandable; //if Children than
  
  onChangePermission = (event, data) => {
    let index = this.values.indexOf(data);
    if(index == '-1'){
      this.values.push(data);
    }
    else{
      this.values.splice(index, 1);
    }
  };
  
  allChecked = false;
  removeAllChecked = false;
  onParentChangePermission = (event:MatCheckboxChange, data) => {
    this.allChecked = false;
    this.removeAllChecked = false;
    if(event.checked == true){
      data.forEach(result => {
        let index = this.values.indexOf(result.value);
        if(index == '-1'){
          this.values.push(result.value);
        }
      });
      this.allChecked = true;
    }
    else{
      data.forEach(result => {
        console.log(result);
        let index = this.values.indexOf(result.value);
        this.values.splice(index, 1);
      });
      this.removeAllChecked = true;
      console.log(this.values)
    }
  };
  
  
  /* Save Change Permission */
  savePermission = () => {
    this.spinner = true;
    if(!this.currRoleId){
      this.spinner = false;
      this.toaster.error("Please Select a Role");
      return;
    }
    else if (!this.values.length){
      this.spinner = false;
      this.toaster.error('No Permission Selected');
      return;
    }

    this.rolePermissionService.assignPermission(this.values, this.currRoleId).subscribe(result => {
      if(result){
        this.spinner = false;
        this.toaster.success('Permission Assign Successfully');
        this.router.navigate(['/rolepermission']);
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error('!Oops Some Error Occurs While Assign a Permission');
        this.router.navigate(['/dashboard']);
      }
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
  changeRoleStatus = () => {
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
    this.rolePermissionService.changeRoleStatus(payload).subscribe(result => {
      if(result){
        this.toaster.success("Role Status Change Successfully");
        this.ngOnInit();
        this.dialog.closeAll();
      }
    }, error => {
      if(error){
        this.toaster.error("!Oops Some Error To Change Status");
        this.router.navigate(['/dashboard']);
      }
    });
  };

  /*Add New Role*/
  addNewRole = (templateRef: TemplateRef<any>) => {
    this.dialog.open(templateRef, {
      height: '300px',
      width: '400px',
    });
  };

  onSaveRole = (payload) => {
    let addPayload = {
      name: payload.name,
      status: 'Active'
    };
    console.log(addPayload);
    this.rolePermissionService.addNewRole(addPayload).subscribe(result => {
      if(result){
        this.toaster.success('Role Add Successfully');
        this.dataSource.paginator.firstPage();
        this.dialog.closeAll();
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs While Add New Role");
      }
    });
  };
 
  /* Edit Role*/
  openEditRole = (templateRef: TemplateRef<any>, data) => {
    this.editRoleId = data.id;
    this.editRoleDialog = data;
    this.dialog.open(templateRef, {
      height: '300px',
      width: '400px',
    });
  };

  /* Edit Role */
  editRole = (payload) => {
    this.rolePermissionService.updateRoleDialog(this.editRoleId, payload).subscribe(result => {
      if(result){
        this.toaster.success('Role Update Successfully');
        this.dataSource.paginator.firstPage();
        this.dialog.closeAll();
      }
    }, error => {
      if(error){
        this.toaster.error('!Oops Some Error Occurs While Updating a role');
        this.router.navigate(['/rolepermission']);
      }
    });
  };

}
