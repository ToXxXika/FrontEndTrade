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
  Trades: number;


  constructor(private Prod : ProductService,private AuthService: AuthServiceService,private  Msg: MessageService,private tradeS:TradeService) {
   this.Prod.getProd().subscribe(ProdData=>{
     let a:any=0;
     let b:any=0;
     let c:any=0;
     let d:any=0;
     for (let i =0 ;i<ProdData.length;i++){
       switch (ProdData[i].category){
         case "Accessories":
           a++;
           break;
         case "Clothing":
           b++
           break;
         case "Electronics":
           c++
           break;
         case "Fitness":
           d++
           break;
         default:console.log("ERREUR") ;break;
       }
     }
      this.datachart={
       labels: ["Accessories","Clothing","Electronics","Fitness"],
        datasets:[

          {
            label: 'Nombre Produits Par Categories',
            data: [a,b,c,d],
            fill: true ,
            backgroundColor: '#42A5F5',
            borderColor: '#4bc0c0',

          }
        ]
      }
    })

  }

  ngOnInit() {
    this.tradeS.getTrades().subscribe(TradeData=>{
      this.Trades=TradeData.length;
    })
    this.AuthService.getAllusers().subscribe(UserData =>{
      this.UserNumbers = UserData.length ;
    });
    this.Prod.getProd().subscribe(ProdData =>{
      this.ProdNumbers = ProdData.length;

    });


  }


}
