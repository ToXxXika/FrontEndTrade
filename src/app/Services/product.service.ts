import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
   console.log("Hi")
   return this.http.post<any>(this.urlsaveProd,PP)
  }
}
