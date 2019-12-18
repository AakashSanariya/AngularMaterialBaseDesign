import { Component, OnInit } from '@angular/core';
import {ManageUser} from "../../../model/manage-user";
import {CategoryManageService} from "../../../_services/category-manage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {

  constructor(private manageCategoryService: CategoryManageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toaster: ToastrService
  ) { }

  EditDetails = new ManageUser();
  editId: any;
  spinner:boolean= true;
  parentCategoryName: string;
  parentCategoryData: any;
  parenttoparentCategory: any;
  parent_id: number;

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(param => {
      if(param.get('id') == null){
        this.spinner =false;
        this.getParentCategory(0)
      }
      else{
        this.editId = param.get('id');
        this.findCategory(this.editId);
      }
    });
  }

  /* For Finding a Category*/
  findCategory = (payload) => {
    this.manageCategoryService.findCategoryById(payload).subscribe(result => {
      if(result){
        this.spinner = false;
        this.EditDetails = result.data;
        this.parentCategoryName = result.data.parent_name;
        this.parent_id = result.data.parent_id == 0 ? '0' : result.data.parent_id;
        this.getParentCategory(this.editId);
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
        this.router.navigate(['/dashboard'])
      }
    });
  };

  /* Parent Category Finding*/
  getParentCategory = (id) => {
    let name = this.parentCategoryName;
    if(this.parentCategoryName == null){
       name = '0';
    }
    this.manageCategoryService.findParentCategoryById(id, name).subscribe(result => {
      if(result){
        console.log(result);
        let newValue={id:'0',name:'Select Category'};
        this.parentCategoryData = result.data;
        this.parentCategoryData.splice(0,1,newValue);
        if(this.editId){
          this.parenttoparentCategory = {id:this.parent_id,name:this.parentCategoryName};
        }
        else{
          this.parenttoparentCategory = this.parentCategoryData[0];
        }
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
        this.router.navigate(['/category/list']);
      }
    });
  };

  /* On Submit*/
  onSubmit = (payload) => {
    if(this.editId == null){
      this.addNewCategory(payload);
    }
    else{
      this.updateCategory(payload);
    }
  };

  /* Add New Category */
  addNewCategory = (payload) => {
    this.spinner = true;
    console.log(payload);
    this.manageCategoryService.createNewCategory(payload).subscribe(result => {
      if(result){
        this.spinner = false;
        this.toaster.success("New Category Add Successfully");
        this.router.navigate(['/category/list']);
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
        this.router.navigate(['/category/list']);
      }
    });
  };

  /* Edit Category*/
  updateCategory = (payload) => {
    this.spinner = true;
    console.log(payload);
    this.manageCategoryService.updateCategoryById(this.editId, payload).subscribe(result => {
      if(result){
        this.spinner = false;
        this.toaster.success("Category Update Successfully");
        this.router.navigate(['/category/list']);
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
        this.router.navigate(['/category/list']);
      }
    });
  };

}
