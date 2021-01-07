import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

import {MessageService} from "primeng/api";

import {AuthServiceService} from "../../Services/auth-service.service";
import {ProductService} from "../../Services/product.service";
import {TradeService} from "../../Services/trade.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers :[MessageService]
})
export class DashboardComponent implements OnInit {
  public datachart: any
  public datasets: any;
  public data: any;
  public PriceTable : any[]=[];
  public Productname : any[]=[];
  private UserNumbers : number ;
  private ProdNumbers : number ;
  private AlertNumbers: number ;
  Trades: any[];


  constructor(private Prod : ProductService,private AuthService: AuthServiceService,private  Msg: MessageService,private tradeS:TradeService) {
   this.Prod.getProd().subscribe(ProdData=>{
     for (let i =0 ;i<ProdData.length;i++){
       this.Productname.push(ProdData[i].libelle+" "+ProdData[i].marque);
     }
      this.datachart={
       labels: this.Productname,
        datasets:[
          {
            label: 'Prix Produit',
            data: this.PriceTable,
            fill: false ,
            borderColor: '#4bc0c0'
          }
        ]
      }
    })

  }

  ngOnInit() {
    this.tradeS.getTrades().subscribe(TradeData=>{
      this.Trades=TradeData;
    })
    this.AuthService.getAllusers().subscribe(UserData =>{
      this.UserNumbers = UserData.length ;
    });
    this.Prod.getProd().subscribe(ProdData =>{
      this.ProdNumbers = ProdData.length;

    });


  }


}
