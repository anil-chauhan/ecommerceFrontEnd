import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthorizationService} from "../services/authorization.service";
import {AppRoutes} from "../app-routing.module";


export const LogoutRouteGuard: CanActivateFn = () => {
  const authenticationService = inject(AuthorizationService);
  const router = inject(Router);
  if (!authenticationService.isLoggedIn()) {
    return true;
  } else {
    return router.createUrlTree([AppRoutes.Main]);
  }
};
