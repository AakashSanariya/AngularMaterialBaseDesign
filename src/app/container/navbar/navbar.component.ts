import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AppConstant} from "../../config/app-constant";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private toaster: ToastrService
  ) { }

  userName: string;
  currentYear = new Date().getFullYear();
  siteName = AppConstant.siteName;


  ngOnInit() {
    this.userName = localStorage.getItem('user_name');
  }

  logout = () =>{
    this.authService.logout();
    this.toaster.success("logout successfully");
    this.router.navigate(['/login']);
  }

}
