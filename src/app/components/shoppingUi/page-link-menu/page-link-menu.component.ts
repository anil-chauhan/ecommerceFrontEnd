import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../../../services/authorization.service";
import {CategoryService} from "../../../services/category.service";
import {Router} from "@angular/router";
import {AppRoutes} from "../../../app-routing.module";

@Component({
  selector: 'app-page-link-menu',
  templateUrl: './page-link-menu.component.html',
  styleUrl: './page-link-menu.component.css'
})
export class PageLinkMenuComponent implements OnInit {

  constructor(private authorizationService :AuthorizationService,private router: Router) {}

  login_status: string="";
  login_status_boolean: boolean=false;


  loginStatus() {

    if(this.authorizationService.isLoggedIn()){
      this.login_status_boolean=true;
      let userProfile = this.authorizationService.getUserProfile();
      this.login_status="Welcome "+userProfile.__zone_symbol__value.username;
    }else {
      this.login_status="Login"
    }
  }

  ngOnInit(): void {
    this.loginStatus()
  }



  startLogin() {
    this.router.navigate(['/login']);
  }


  loginOut() {

    if(this.authorizationService.isLoggedIn()){
      this.authorizationService.logout()
    }else {
      this.login_status="Login"
    }
  }

}
