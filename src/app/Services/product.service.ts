import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 private urlGetProducts ="http://localhost:8080/product/getProducts"
  private urlsaveProd="http://localhost:8080/product/addProduct"

  constructor(private http:HttpClient) { }

  public getProd(){
    return this.http.get<any[]>(this.urlGetProducts)
  }
  public saveProduct(PP:Product){
   let opts :{params: HttpParams};
   opts={'params': new HttpParams({'fromString':`email=${localStorage.getItem("MailLocal")}`})}
   return this.http.post<any>(this.urlsaveProd,PP,opts)
  }
}
