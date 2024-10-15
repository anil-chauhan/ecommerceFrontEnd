import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../services/order-service";
import {OrdersResponse} from "../../../comman/orders_response";
import {AuthorizationService} from "../../../services/authorization.service";

@Component({
  selector: 'app-orders-main-page',
  templateUrl: './orders-main-page.component.html',
  styleUrl: './orders-main-page.component.css'
})
export class OrdersMainPageComponent implements OnInit {


  myOrders: OrdersResponse[] = []
  userEmail:string="";

  constructor(private orderService: OrderService,private authorizationService :AuthorizationService) {
    this.loginStatus()
    this.getOrders(this.userEmail)
  }


  ngOnInit(): void {


  }


  loginStatus() {

    if(this.authorizationService.isLoggedIn()){
      let userProfile = this.authorizationService.getUserProfile();
      this.userEmail=userProfile.__zone_symbol__value.username;
    }else {
      //this.login_status="Login"
    }
  }


  getOrders(email:string) {


    let myData = {

      "customerEmail":email
    }


    this.orderService.getOrdersByCustomerEmail(myData).subscribe(data => {
      console.log("Retrieved countries: " + JSON.stringify(data));
      this.myOrders = data;
    });

  }

}
