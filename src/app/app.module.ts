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
      CategoryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule
  ],
  providers: [
    ProductService,

    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    /*provideUserIdleConfig({
      idle: environment.idleConfig.idle,
      ping: environment.idleConfig.ping,
      timeout: environment.idleConfig.timeout,
    }),*/

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
