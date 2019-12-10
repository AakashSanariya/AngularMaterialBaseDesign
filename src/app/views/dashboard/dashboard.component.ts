import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../_services/dashboard.service";
import {first} from "rxjs/internal/operators/first";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }


  ngOnInit() {
  }

}
