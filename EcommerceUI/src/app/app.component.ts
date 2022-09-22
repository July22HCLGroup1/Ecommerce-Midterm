import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IdxFeature } from '@okta/okta-auth-js';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'EcommerceUI';
  hideHeader = false;
  hideFooter = false;
  hideFooterList = [
    '/admin',
    '/admin/user-management',
    '/admin/inventory-management',
    '/admin/inventory-management/add-product',
    '/admin/inventory-management/update-product/:id',
    '/admin/order-management',
    '/admin/user-management/update-user/',
    '/admin/order-management',
    '/admin/order-management/view-order/:id',
  ];
  hideHeaderList = [
    '/admin',
    '/admin/user-management',
    '/admin/inventory-management',
    '/admin/inventory-management/add-product',
    '/admin/inventory-management/update-product/:id',
    '/admin/order-management',
    '/admin/user-management/update-user/:userid',
    '/admin/order-management',
    '/admin/order-management/view-order/:id',
    '/login',
    '/loginSuccess',
    '/home-page',
    '/forbidden',
    '/registration'
  ]

  constructor(public router : Router) {
    this.router.events.subscribe((event: any) => {
      if(event instanceof NavigationEnd) {
        console.log(event.url);
        if(this.hideHeaderList.includes(event.url) || event.url.match('/admin')) {
          this.hideHeader = true;
        }

        if(this.hideFooterList.includes(event.url) || event.url.match('/admin')) {
          this.hideFooter = true;
        }

      }
    })

  }

}
