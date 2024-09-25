import { Component } from '@angular/core';
import {AuthorizationService} from "../../services/authorization.service";

@Component({
  selector: 'app-protected-route',
  templateUrl: './protected-route.component.html',
  styleUrl: './protected-route.component.css'
})
export class ProtectedRouteComponent {

  constructor(readonly authenticationService: AuthorizationService) {}

}
