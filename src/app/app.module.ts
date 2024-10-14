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
import {MatDialogActions, MatDialogContent, MatDialogModule} from "@angular/material/dialog";
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

import { ShopDisplayProductsComponent } from './components/shoppingUi/shop-display-products/shop-display-products.component';
import { FooterComponent } from './components/shoppingUi/footer/footer.component';
import { HomePageComponent } from './components/shoppingUi/homePage/home-page/home-page.component';
import { CategoryDetailsSectionComponent } from './components/shoppingUi/homePage/category-details-section/category-details-section.component';
import {CategoryMenuComponent} from "./components/shoppingUi/homePage/category-menu/category-menu.component";
import {TrandyProductsComponent} from "./components/shoppingUi/homePage/trandy-products/trandy-products.component";
import {
  JustArrivedProductsComponent
} from "./components/shoppingUi/homePage/just-arrived-products/just-arrived-products.component";
import { PageLinkMenuComponent } from './components/shoppingUi/page-link-menu/page-link-menu.component';
import { TopBarHelpSupportComponent } from './components/shoppingUi/top-bar-help-support/top-bar-help-support.component';
import { ProductDetailsPageComponent } from './components/shoppingUi/product-details-page/product-details-page.component';
import { ProductDisplayCardComponent } from './components/shoppingUi/product-display-card/product-display-card.component';
import {ToastrModule} from "ngx-toastr";
import { CustomDialogBoxComponent } from './components/shoppingUi/cutome-dialog-box/custom-dialog-box.component';
import { ShoppingCartComponent } from './components/shoppingUi/shopping-cart/shopping-cart.component';
import { AllCategoriesComponent } from './components/shoppingUi/all-categories/all-categories.component';
import { CheckOutCustomerFormComponent } from './components/shoppingUi/checkOutPage/check-out-customer-form/check-out-customer-form.component';
import {CheckOutPageComponent} from "./components/shoppingUi/checkOutPage/check-out-page/check-out-page.component";
import { UserProfileComponent } from './components/shoppingUi/user-profile/user-profile.component';
import { OrdersMainPageComponent } from './components/shoppingUi/orders-main-page/orders-main-page.component';


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
      CartDetailsComponent,
      CheckoutComponent,
      CategoryMenuComponent,
      ShopDisplayProductsComponent,
      FooterComponent,
      HomePageComponent,
      CategoryDetailsSectionComponent,
      TrandyProductsComponent,
      JustArrivedProductsComponent,
      PageLinkMenuComponent,
      TopBarHelpSupportComponent,
      ProductDetailsPageComponent,
      ProductDisplayCardComponent,
      CustomDialogBoxComponent,
      ShoppingCartComponent,
      AllCategoriesComponent,
      CheckOutPageComponent,
      CheckOutCustomerFormComponent,
      UserProfileComponent,
      OrdersMainPageComponent
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
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-center', // set position to top-left
        preventDuplicates: true, // optional: prevents duplicate notifications
      }
    ), // ToastrModule added
    MatDialogModule
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
