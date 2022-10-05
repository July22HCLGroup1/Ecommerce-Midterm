import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  public productList: any;

  public lowStock : boolean;
  constructor(private adminService : AdminService) { }


  ngOnInit(): void {
    this.adminService.getAllProducts()
    .subscribe(res => {
      this.productList = res;
      console.log("Product list found");
    });
  }

  public ifDeleteProduct(productId: any) {
    var answer = window.confirm("Delete product?");
    if (answer) {
      this.adminService.deleteProduct(parseInt(productId)).subscribe(data => {
        window.location.reload();
      });
    }
  }

  public processRestock() {
    this.adminService.processRestock().subscribe((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
      if(error == "OK") {
        Swal.fire(
          'Success!',
          'Successfuly Restock!',
          'success'
        ).then(function(){
          window.location.reload();
        })
      }
    })
  }
}
