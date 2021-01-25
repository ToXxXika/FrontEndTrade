import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {ConfirmationService} from "primeng";
import {Trade} from "../../models/trade";
import {TradeService} from "../../Services/trade.service";
import {ProductService} from "../../Services/product.service";
import {MessageService} from "primeng/api";
import {QRCODE} from "qrcode";

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

  RowTrade: any;


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
  this.productDialog2=false
  }

  openNew() {
    this.submitted = false;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  RandomTrade(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  //====================================================

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
      NewTrade.matriculetrade=String("Mat"+this.RandomTrade(100,10000))
      this.TradeServ.addTrade(NewTrade).subscribe(res => {
        if (res) {
          this.Msg.add({
            key: "SS",
            severity: "success",
            summary: "Transaction ajoutée",
            detail: "Succées lors d'ajout du Transaction"
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
    //ajout QR Code for the product
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
        this.Msg.add({
          key: "SS",
          severity: "success",
          summary: "Notification par Mail",
          detail: "Un Code QR a été envoyé dans votre Boite email"
        })
        this.productDialog = false;
      } else {
        this.Msg.add({key: "SS", severity: "warn", summary: "Produit non Ajouté", detail: "Echec d'ajout du produit"})
      }
    }, error => {
      console.log(error)
    })
  }

  //trader 1 is gonna confirm the trade
  ConfirmTrade(T: any) {
    this.TradeServ.acceptTrade(T["matriculetrade"]).subscribe(res=>{
      this.Msg.add({
        key: "SS",
        severity: "success",
        summary: "Transaction confirmée",
        detail: "l'operation est terminé avec sucées "
      })
    })
  }

  //trader 2 is going to complete the trade
  productDialog2: any;
  NameProduct2: any;
  Matricule2: any;
  Description2: any;
  selectedRadio2: any;
  //=================================
  CompleteTrade(Pro: any) {
   this.productDialog2=true
    this.RowTrade= Pro;
  }
  AddProdC2() {
    let P2 : Product = new Product();
    P2.matriculeproduit = this.Matricule2;
    P2.description = this.Description2
    P2.nomproduit = this.NameProduct2;
    P2.category = this.selectedRadio2;
    this.XX.saveProduct(P2).subscribe(res => {
         if (res) {
           this.Msg.add({
             key: "SS",
             severity: "success",
             summary: "Produit ajoutée",
             detail: "Succées lors d'ajout du Produit"
           })
           console.log("Kamel2")
           this.productDialog2 = false;
         } else {
           this.Msg.add({key: "SS", severity: "warn", summary: "Produit non Ajouté", detail: "Echec d'ajout du produit"})
         }
       }, error => {
         console.log(error)
       })
       console.log("this.RowTrade=")
       console.log(this.RowTrade)
       console.log(this.RowTrade.matriculetrade)
       this.RowTrade.client2=localStorage.getItem('CinLocal')
       this.RowTrade.produitc2=P2.nomproduit;
       console.log("Client2")
       console.log(this.RowTrade.client2)
       console.log(this.RowTrade.produitc2);
       this.TradeServ.updateTrade(this.RowTrade).subscribe(resultat=>{
         if(resultat) {
           this.Msg.add({
             key: "SS",
             severity: "info",
             summary: "Transaction",
             detail: "Votre Demande de (Trade) est en cours d'execution"
           })
         }
       })

  }
}
