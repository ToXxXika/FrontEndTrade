import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {ConfirmationService} from "primeng";
import {Trade} from "../../models/trade";
import {TradeService} from "../../Services/trade.service";
import {ProductService} from "../../Services/product.service";
import {MessageService} from "primeng/api";

/*   type infoTrade = Record<string,Date>;
  const p :infoTrade={
    "idTrade":;
  }*/
import x from "bson-objectid";

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css'],
  styles:[`:host ::ng-deep .p-dialog .product-image {
    width: 150px;
    margin: 0 auto 2rem auto;
    display: block;}`],
  providers:[ConfirmationService,MessageService]
})
export class TradeComponent implements OnInit {
  productDialog: any;
  submitted: boolean;
  // @ts-ignore
  P1: Product = new Product();
  Name: any;
  Surname: any;
  Tel: any;
  cin: any;
  selectedRadio: any;
  Matricule: any;
  Description: any;
  NameProduct: any;
  Trades: any
  localCIN: any;
  T: any;

  Prod1Edited: any;

  constructor(private TradeServ: TradeService, private XX: ProductService, private Msg: MessageService, private Confirmation: ConfirmationService) {
  }

  ngOnInit(): void {
    this.TradeServ.getTrades().subscribe(res => {
      this.Trades = res;
      this.localCIN = localStorage.getItem("CinLocal");
      this.cin = localStorage.getItem("CinLocal")
      this.Name = localStorage.getItem("nameLocal")
      this.Surname = localStorage.getItem("surnameLocal")
      this.Tel = localStorage.getItem("NumLocal")
    })
  }

  openNew() {
    this.submitted = false;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  AddTrade() {
    let NewTrade: Trade = new Trade();
    if (Object.keys(this.P1).length === 0) {
      this.Msg.add({
        key: "SS",
        severity: "error",
        summary: "Produit Introuvable",
        detail: "vous ne pouvez pas  ajouter une Transaction sans Produit"
      })

    } else {
      NewTrade.client1 = this.cin;
      NewTrade.statutechange = 0;
      NewTrade.produitc1 = this.P1.nomproduit;
      this.TradeServ.addTrade(NewTrade).subscribe(res => {
        if (res) {
          this.Msg.add({
            key: "SS",
            severity: "success",
            summary: "Transaction ajoutée",
            detail: "Succées lors d'ajout du Transaction"
          })
          this.Msg.add({
            key: "SS",
            severity: "info",
            summary: "Transaction ajoutée",
            detail: "vous pouvez verifier votre Transaction ou la Changer"
          })
        } else {
          this.Msg.add({key: "SS", severity: "warn", summary: "", detail: ""})

        }
      }, error => {
        console.log(error)
      })
    }
  }

  AddProd() {
    //ajouter un produit a la base de données
    this.P1.matriculeproduit = this.Matricule;
    this.P1.description = this.Description
    this.P1.nomproduit = this.NameProduct;
    this.P1.category = this.selectedRadio;
    console.log(this.P1)
    this.XX.saveProduct(this.P1).subscribe(res => {
      if (res) {
        this.Msg.add({
          key: "SS",
          severity: "success",
          summary: "Produit ajoutée",
          detail: "Succées lors d'ajout du Produit"
        })
        this.productDialog = false;
      } else {
        this.Msg.add({key: "SS", severity: "warn", summary: "Produit non Ajouté", detail: "Echec d'ajout du produit"})
      }
    }, error => {
      console.log(error)
    })
  }

  ConfirmTrade(T: any) {
     this.TradeServ.getTrades().subscribe(data=>{
       data.forEach(function (item){
         if(item.id["timestamp"]==T.id["timestamp"]){
            T.client2=localStorage.getItem('CinLocal');
            T.produitc2=;

         }
       })
     })
  }
}
