import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public userList : any;

  constructor(private adminService : AdminService) { 

  }

  ngOnInit(): void {
    this.adminService.getAllUsers()
    .subscribe(res => {
      this.userList = res;
      console.log(this.userList);
      console.log(this.userList.roles);
    });
  }

  public deleteUser(id : any) {
    console.log(id);
    this.adminService.deleteUser(parseInt(id)).subscribe(data => {
      window.location.reload();
    });
  }
}
