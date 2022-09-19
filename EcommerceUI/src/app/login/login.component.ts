import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserAuthService } from '../service/user-auth.service';
import { UserService } from '../service/user.service';
import { User } from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  PATH_OF_API = environment.apiUrl;

  AUTH_URL = this.PATH_OF_API + "/oauth2/authorize/okta?redirect_uri=" + window.location.origin + "/oauth2/callback/okta";

  user = new User();
  response : any;
  msg = '';

  public isAuthenticated$!: Observable<boolean>;
  public isDatabaseLoggedIn : boolean;
  public isLoggedIn : boolean;

  public name$!: Observable<string>;

  constructor(
    private userService: UserService, 
    private userAuthService: UserAuthService, 
    private router : Router, 
    private oktaAuthStateService: OktaAuthStateService, 
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.userAuthService.checkAuthenticated(); 
    this.isDatabaseLoggedIn = this.userAuthService.isDatabaseLoggedIn();
    this.isLoggedIn = this.userAuthService.isLoggedIn();
    this.getUserDetails();
    console.log(window.location.origin);
    
  }

  getUserDetails(){
    this.name$ = this.oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );
  }

  loginUser(){
    console.log(this.user);

    let authRequest : any = {
      "email": this.user.email,
      "password": this.user.password
    }

    this.userService.login(authRequest).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.roles);
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setDatabaseLogin("true");

        const role = response.user.roles[0].roleName;
        const roleList = response.user.roles;
       
        let isAdmin = false;

        for(let item in roleList) {
          console.log(roleList[item].roleName);
          if(roleList[item].roleName === "ADMIN"){
            isAdmin = true;
          }
        }

        if (isAdmin === true) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/products']);
        }
      },
      (error) => {
        console.log(error);
        this.msg = "Bad credentials! Please re-enter email and password.";
      }
    );

  }

  public async oktaLogin() : Promise<any> {
    this.oktaAuth.signInWithRedirect({originalUri: "/loginSuccess"});
  }

  public async oktaLogout(): Promise<void> {
    await this.oktaAuth.signOut();
    this.userAuthService.clear();
  }

  public logout() {
    this.userAuthService.logout();
  }

}
