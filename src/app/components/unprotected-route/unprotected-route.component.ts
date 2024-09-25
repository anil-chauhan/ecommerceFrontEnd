import { Component } from '@angular/core';
import {AuthorizationService} from "../../services/authorization.service";

@Component({
  selector: 'app-unprotected-route',
  templateUrl: './unprotected-route.component.html',
  styleUrl: './unprotected-route.component.css'
})
export class UnprotectedRouteComponent {

  get username(): string {
    return this.authenticationService.isLoggedIn()
      ? this.authenticationService.userName
      : 'friend';
  }
  constructor(readonly authenticationService: AuthorizationService) {}

}
