import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product }from '../common/product';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  requestHeader = new HttpHeaders(
    { "No-Auth" : "True"}
  );

  PATH_OF_API = environment.apiUrl;

  product: Product | undefined;
  products: Product[] | undefined;
  
  constructor(private http : HttpClient) { }

  public getProduct(){
    return this.http.get<any>(this.PATH_OF_API + "/api/products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
  public getProductById(id: string): Observable<Product>{
    return this.http.get<Product>(this.PATH_OF_API + "/api/product/" + id).pipe(map((data: Product) => this.product = {
      productId: (data as any).productId,
      productName: (data as any).productName,
      unitPrice: (data as any).unitPrice,
      productStock: (data as any).productStock,
      productImage: (data as any).productImage,
      productDescription: (data as any).productDescription
      }),
      catchError(error => this.throwError(error))
    )
  }

  // Send page parameters to backend - allow it to handle pagination
  public getSearchResultPages(searchStr: string, index: string, count: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.PATH_OF_API + "/api/product/search/page", { params: {searchStr, index, count} });
  }

  // Only send search string - allow frontend to handle pagination
  public getSearchResult(searchStr: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.PATH_OF_API + "/api/product/search", { params: {searchStr} });
  }

  throwError(error: any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
