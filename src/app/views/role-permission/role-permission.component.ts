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
import {SelectionModel} from '@angular/cdk/collections';

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
  ) {
    /*First Time Tree Control Load */
    this.treeControl = new FlatTreeControl<ManageUser>(this.getLevel, this.isExpandable);
  }

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

  /* Tree View */
  flatNodeMap = new Map<any, any>();
  nestedNodeMap = new Map<any, any>();
  treeControl: FlatTreeControl<any>;
  treeFlattener: MatTreeFlattener<any, any>;
  items: MatTreeFlatDataSource<any, any>;
  checklistSelection = new SelectionModel<any>(true /* multiple */);

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

        // this.items.data = items; // material tree node data binding after _transform call()
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren); // tree required Information getting
        this.treeControl = new FlatTreeControl<any>(this.getLevel, this.isExpandable);
        this.items = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        this.items.data = items; // matTreeFlatDataSource in data push
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
        this.router.navigate(['/dashboard']);
      }
    });
  };

  getLevel = (node: any) => node.level; // total no of level
  isExpandable = (node: any) => node.expandable; // confirm expandable or not
  getChildren = (node: any): any[] => node.children; // children data get
  hasChild = (_: number, _nodeData: any) => _nodeData.expandable; //check child having or not

  /*data transfer in material tree view*/
  transformer = (node: any, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item == node.item
        ? existingNode
        : new ManageUser();
    flatNode.item = node;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /*Children all data Selection for checkbox checked display*/
  descendantsAllSelected(node: any): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>{
          this.checklistSelection.isSelected(child.item.checked)
        }
    );
    return descAllSelected;
  }
  /* Parent Data All Selection For Checkbox checked  display*/
  descendantsPartiallySelected(node: any): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => {
      this.checklistSelection.isSelected(child.item.checked)
    });
    return result && !this.descendantsAllSelected(node);
  }

  /* children data permission change after checked or remove */
  onChangePermission = (event, data, node) => {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);

    /* Push or Delete Value Of Checked Array*/
    let index = this.values.indexOf(data);
    if(index == '-1'){
      this.values.push(data); // checked than push value if not listed in array
    }
    else{
      this.values.splice(index, 1); // unchecked than remove value
    }
  };

  /* Parent Select than add all it's children to permission*/
  onParentChangePermission = (event:MatCheckboxChange, data, node) => {
    this.checklistSelection.toggle(node); // checkbox toggle
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
        ? this.checklistSelection.select(...descendants)
        : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
        this.checklistSelection.isSelected(child.item.checked)
    );
    this.checkAllParentsSelection(node);

    if(event.checked == true){
      data.forEach(result => { //each children node
        let index = this.values.indexOf(result.value);
        if(index == '-1'){
          this.values.push(result.value); //checked than push value if not listed in array
        }
      });
    }
    else{
      data.forEach(result => { //each children node
        console.log(result);
        let index = this.values.indexOf(result.value);
        this.values.splice(index, 1); // unchecked than remove
      });
    }
  };

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection = (node: any): void => {
    let parent: any | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  };

  /*Check root node checked state and change it accordingly*/
  checkRootNodeSelection = (node: any): void => {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
        this.checklistSelection.isSelected(child.item.checked)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  };

  /* Finding Parent Node*/
  getParentNode = (node: any): any | null => {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
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
