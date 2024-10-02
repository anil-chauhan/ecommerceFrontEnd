import { Component } from '@angular/core';
import {AppRoutes} from "./app-routing.module";
import {CategoryService} from "./services/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontendAngular';

  constructor(private categoryService: CategoryService,private router: Router) { }
  selectCategory() {
    this.router.navigate(['/'+AppRoutes.SelectCategory]);
  }
}
