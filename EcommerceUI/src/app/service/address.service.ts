import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  PATH_OF_API = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }

  public getUserAddress() : Observable<any> {
    return this.httpClient.get<any>(this.PATH_OF_API + "/user/getUserAddress");
  }
}
