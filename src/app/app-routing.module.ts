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
import {CategoryListComponent} from "./components/category-list/category-list.component";
import {SubCategoryListComponent} from "./components/sub-category-list/sub-category-list.component";
import {LeftSideMenuTreeComponent} from "./components/left-side-menu-tree/left-side-menu-tree.component";
import {AddCategoryComponent} from "./components/admin/add-category/add-category.component";
import {SelectCategoryComponent} from "./components/admin/select-category/select-category.component";
import {AddProductComponent} from "./components/admin/add-product/add-product.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {CartDetailsComponent} from "./components/cart-details/cart-details.component";


export enum AppRoutes {
  Main = 'sdad',
  Protected = 'protected',
  Unprotected = 'unprotected',
  Logout = 'logout',
  NotFound = '404',

  Product = 'product',
  ProductDetails = 'product_details/:productId',
  SearchProducts = 'search',
  Category = '1',
  CategoryTree = '2',
  SubCategory="sub_category",
  AddCategory="add_category",
  AddProduct="add_product",
  SelectCategory="select_category",
  CartDetail="cart-details",
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
    path: AppRoutes.SearchProducts,
    component: ProductListComponent,
  },

  {
    path: AppRoutes.ProductDetails,
    component: ProductDetailsComponent,
  },



  {
    path: AppRoutes.Category,
    component: CategoryListComponent,
  },

  {
    path: AppRoutes.AddCategory,
    component: AddCategoryComponent,
  },

  {
    path: AppRoutes.AddProduct,
    component: AddProductComponent,
  },

  {
    path: AppRoutes.SelectCategory,
    component: SelectCategoryComponent,
  },

  {
    path: AppRoutes.SubCategory,
    component: SubCategoryListComponent,
  },

  {
    path: AppRoutes.CartDetail,
    component: CartDetailsComponent,
  },


  {
    path: AppRoutes.CategoryTree,
    component: LeftSideMenuTreeComponent,
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
