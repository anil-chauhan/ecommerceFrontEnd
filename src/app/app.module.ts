import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { UnprotectedRouteComponent } from './components/unprotected-route/unprotected-route.component';
import { ProtectedRouteComponent } from './components/protected-route/protected-route.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LogoutScreenComponent } from './components/logout-screen/logout-screen.component';
import {environment} from "../environments/environment";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import { HttpClientModule } from '@angular/common/http';

import { ProductListComponent } from './components/product-list/product-list.component';
import {ProductService} from "./services/product.service";
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SubCategoryListComponent } from './components/sub-category-list/sub-category-list.component';
import {NgOptimizedImage} from "@angular/common";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatTreeModule} from "@angular/material/tree";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import { LeftSideMenuTreeComponent } from './components/left-side-menu-tree/left-side-menu-tree.component';
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatChip, MatChipSet} from "@angular/material/chips";
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SelectCategoryComponent } from './components/admin/select-category/select-category.component';
import { ConfirmDialogComponent } from './components/admin/confirm-dialog/confirm-dialog.component';
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

export const initializeKeycloak = (keycloak: KeycloakService) => async () =>
  keycloak.init({
    config: {
      url: environment.keycloak.authority,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId,
    },
    loadUserProfileAtStartUp: true,
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
        window.location.origin + '/assets/silent-check-sso.html',
      checkLoginIframe: false,
      redirectUri: environment.keycloak.redirectUri,
    },
  });




@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    UnprotectedRouteComponent,
    ProtectedRouteComponent,
    NotFoundComponent,
    LogoutScreenComponent,

    ProductListComponent,
      CategoryListComponent,
      SubCategoryListComponent,
      LeftSideMenuTreeComponent,
      AddCategoryComponent,
      SelectCategoryComponent,
      ConfirmDialogComponent,
      AddProductComponent,
      SearchProductComponent,
      ProductDetailsComponent,
      CartStatusComponent,
      CartDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule,
    NgOptimizedImage,
    MatTreeModule,
    MatButtonModule,
    MatIconButton,
    MatIcon,
    MatChipSet,
    MatChip,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
  ],
  providers: [
    ProductService,

    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
      provideAnimationsAsync(),
    /*provideUserIdleConfig({
      idle: environment.idleConfig.idle,
      ping: environment.idleConfig.ping,
      timeout: environment.idleConfig.timeout,
    }),*/

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
