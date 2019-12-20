import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {mergeMap} from "rxjs/internal/operators/mergeMap";
import {map} from "rxjs/internal/operators/map";
import {filter} from "rxjs/internal/operators/filter";
import {Title} from "@angular/platform-browser";
import {AppConstant} from "./config/app-constant";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'BaseStructureAngMa';
  fullTitle:string;
  appTitle = AppConstant.siteName;

  constructor (private router: Router,
               private activatedRoute: ActivatedRoute,
               private titleService: Title
  ) { }

  ngOnInit() {
    this.router.events
        .pipe(filter(event => event instanceof NavigationEnd),
            map(() => {
              let route = this.activatedRoute.firstChild;
              let child = route;
              console.log(child)
              while (child) {
                if (child.firstChild) {
                  child = child.firstChild;
                  route = child;
                } else {
                  child = null;
                }
              }
              return route;
            }),
            mergeMap(route => route.data)
        )
        .subscribe(result => {
          if(result.title){
            this.titleService.setTitle(this.appTitle + '|' + result.title);
          }
        });
  }
}
