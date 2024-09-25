import { Component } from '@angular/core';
import {AuthorizationService} from "../../services/authorization.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
  constructor(private readonly authenticationService: AuthorizationService) {}
  redirectToLoginPage(): void {
    this.authenticationService.redirectToLoginPage();
  }

}
