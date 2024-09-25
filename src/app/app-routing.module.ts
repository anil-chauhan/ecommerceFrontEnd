import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./components/main-page/main-page.component";
import {ProtectedRouteComponent} from "./components/protected-route/protected-route.component";
import {UnprotectedRouteComponent} from "./components/unprotected-route/unprotected-route.component";
import {LogoutScreenComponent} from "./components/logout-screen/logout-screen.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AuthGuard} from "./guard/auth.guard";
import {LogoutRouteGuard} from "./guard/auth.guard.logout";
import {ProductListComponent} from "./components/product-list/product-list.component";


export enum AppRoutes {
  Main = 'sdad',
  Protected = 'protected',
  Unprotected = 'unprotected',
  Logout = 'logout',
  NotFound = '404',

  Product = '',
}

const routes: Routes = [

  {
    path: AppRoutes.Main,
    pathMatch: 'full',
    component: MainPageComponent,
  },
  {
    path: AppRoutes.Protected,
    canActivate: [AuthGuard],
    component: ProtectedRouteComponent,
  },
  {
    path: AppRoutes.Unprotected,
    component: UnprotectedRouteComponent,
  },
  {
    path: AppRoutes.Logout,
    canActivate: [LogoutRouteGuard],
    component: LogoutScreenComponent,
  },
  {
    path: AppRoutes.NotFound,
    component: NotFoundComponent,
  },

  {
    path: AppRoutes.Product,
    component: ProductListComponent,
  },

  {
    path: '**',
    redirectTo: AppRoutes.NotFound,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
