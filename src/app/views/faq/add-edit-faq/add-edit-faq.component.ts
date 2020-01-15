import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FaqService} from "../../../_services/faq.service";
import {ToastrService} from "ngx-toastr";
import {ManageUser} from "../../../model/manage-user";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-add-edit-faq',
  templateUrl: './add-edit-faq.component.html',
  styleUrls: ['./add-edit-faq.component.scss']
})
export class AddEditFaqComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private faqSerive: FaqService,
              private toaster: ToastrService,
              private dialog: MatDialog
  ) { }

  spinner: boolean;
  EditDetails = new ManageUser();
  editId: any;
  topicList: any;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      if(param.get('id') == null){
        this.listFaqTopic();
      }
      else{
        this.editId = param.get('id');
        this.findFaqById();
      }
    });
  }

  findFaqById = () => {
    this.spinner = true;
    this.faqSerive.getFaqById(this.editId).subscribe(result => {
      if(result){
        this.spinner = false;
        this.EditDetails = result.data;
        this.listFaqTopic();
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Some Error Occurs");
        this.router.navigate(['/faq/list']);
      }
    });
  };

  /* FAQ Topic List */
  listFaqTopic = () => {
    this.spinner = true;
    this.faqSerive.getFaqTopicList().subscribe(result => {
      this.spinner = false;
      this.topicList = result.data;
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error("!Oops Topic List Not Find");
        this.router.navigate(['/faq/list']);
      }
    });
  };

  dialogClose = () => {
    this.dialog.closeAll();
  };

  onSubmit = (payload) => {
    this.spinner = true;
    if(this.editId == null){
      this.newFaq(payload);
    }
    else{
      this.updateFaq(payload);
    }
  };

  /*Update Faq*/
  updateFaq = (payload) => {
    this.faqSerive.updateFaq(this.editId, payload).subscribe(result => {
      if(result){
        this.spinner = false;
        this.toaster.success("FAQ Update Successfully");
        this.router.navigate(['/faq/list']);
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error('!Oops Some Error Occurs');
        this.router.navigate(['/faq/list']);
      }
    });
  };

  /* Add New Faq*/
  newFaq = (payload) => {
    this.faqSerive.createNewFaq(payload).subscribe(result => {
      if(result){
        this.spinner = false;
        this.toaster.success("FAQ Add Successfully");
        this.router.navigate(['/faq/list']);
      }
    }, error => {
      if(error){
        this.spinner = false;
        this.toaster.error('!Oops Some Error Occurs');
        this.router.navigate(['/faq/list']);
      }
    });
  };

}
