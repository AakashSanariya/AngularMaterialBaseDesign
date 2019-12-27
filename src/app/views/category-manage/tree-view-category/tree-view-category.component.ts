import { Component, OnInit } from '@angular/core';
import {CategoryManageService} from "../../../_services/category-manage.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-tree-view-category',
  templateUrl: './tree-view-category.component.html',
  styleUrls: ['./tree-view-category.component.scss']
})
export class TreeViewCategoryComponent implements OnInit {

  constructor(private manageCategoryService: CategoryManageService,
              private router: Router,
              private toaster: ToastrService
  ) { }

  spinner: boolean = true;
  treeViewData: any;

  options = {
    allowDrag: true,
    allowDrop: true,
    animateExpand: true
  };

  ngOnInit() {
    this.getCategoryTreeView();
  }

  getCategoryTreeView = () => {
    this.manageCategoryService.getCategoryTreeView().subscribe(result => {
      if(result){
        this.spinner = false;
        this.treeViewData = result.data;
        // console.log(this.treeViewData);
      }
    }, error => {
      if(error) {
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
        this.router.navigate(['category/list']);
      }
    });
  };

}
