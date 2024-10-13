import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../../services/authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout-screen',
  templateUrl: './logout-screen.component.html',
  styleUrl: './logout-screen.component.css'
})
export class LogoutScreenComponent  implements OnInit {

  constructor(private authorizationService :AuthorizationService,private router: Router) {}

  ngOnInit(): void {

    //this.authorizationService.logout();
    this.goHomePage()

  }



  goHomePage() {
    this.router.navigate(['/']);
  }




}
