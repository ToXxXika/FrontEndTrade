import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {

 private urlAccessUser = "http://localhost:8080/user/adduser";
 private urlGetAllusers = "http://localhost:8080/user/getUsers";
 private urlDeleteUser = 'http://localhost:8080/user/deleteuser';
 private urlgetuser = "http://localhost:8080/user/login";
  constructor(private Http:HttpClient) { }

  public getUser(username:any,password:any) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
    return this.Http.get<any>(this.urlgetuser, {headers});
  }

  public getAllusers(){
   return this.Http.get<User[]>(this.urlGetAllusers)
  }

  /// MONGODB
  public adduser(P:User){
    return this.Http.post<any>(this.urlAccessUser,P);
  }
  public deleteuser(cin:any){
    let opts : { params : HttpParams};
    opts ={ 'params': new HttpParams({'fromString':`cin=${cin}`})};
    return this.Http.get<any>(this.urlDeleteUser,opts);
  }
}
