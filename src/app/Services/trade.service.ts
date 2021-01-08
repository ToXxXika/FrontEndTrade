import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Trade} from '../../../../Lassoued/src/app/models/trade';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  private urlAddTrade = "http://localhost:8080/trade/addTrade";
  private urlGetTrades = "http://localhost:8080/trade/getAllTrades";
  private urlGetTradesbyProduct = "http://localhost:8080/trade/getTradeByPr";
  private urlgetTradeById="http://localhost:8080/trade/getTradeById";
  private urlupdateTrade="http://localhost:8080/trade/updateTrade";
  private urlAcceptTrade = "http://localhost:8080/trade/acceptTrade"
  constructor(private http: HttpClient) { }
  public addTrade(T:Trade){
    console.log(T);
    return this.http.post<any>(this.urlAddTrade,T);
  }
  public getTrades(){
    return this.http.get<Trade[]>(this.urlGetTrades)
  }
  public getTradeByPr(nameproduct:any){
    let opts : { params : HttpParams};
    opts ={ 'params': new HttpParams({'fromString':`nomp=${nameproduct}`})};
    return this.http.get<any[]>(this.urlGetTradesbyProduct,opts)
  }
  public getTradeById(id:any){
    let opts : { params : HttpParams};
    opts ={ 'params': new HttpParams({'fromString':`id=${id}`})};
    return this.http.get<any>(this.urlgetTradeById,opts);
  }
  public updateTrade(T:Trade){
    return this.http.post<any>(this.urlupdateTrade,T)
  }
  public acceptTrade(T:any){
    let opts : { params : HttpParams};
    opts ={ 'params': new HttpParams({'fromString':`Mat=${T}`})};
    return this.http.get<any>(this.urlAcceptTrade,opts);
  }
}
