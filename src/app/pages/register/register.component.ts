import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {MenuItem} from 'primeng/api';
import {User} from "../../models/user";
import {AuthServiceService} from "../../Services/auth-service.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[MessageService]
})

export class RegisterComponent implements OnInit {
   P:User = new User() ;
  Utilisateur: string;
  CIN:string ;
  Prenom:string ;
  Nom:string;
  Mail:string ;
  MotPasse:string ;
  columns : any [];
  Users : any[]=[];
  items:MenuItem[];
  NumTel: number;
  Role: any;
  displayboutique : boolean ;
  constructor(private messageService: MessageService,private AuthServ: AuthServiceService ) { }
  ClearData(){
    this.Mail='';
    this.MotPasse='';
    this.Prenom='';
    this.Nom='';
    this.Utilisateur='';
    this.CIN='';
    this.NumTel = 0 ;
    // need to add NumTel here
  }
  AjoutPersonne() {

    this.P.username = this.Utilisateur ;
    this.P.cin = this.CIN ;
    this.P.password = this.MotPasse ;
    this.P.mail = this.Mail;
    this.P.name = this.Nom ;
    this.P.surname = this.Prenom ;
    this.P.telephone = this.NumTel ;
    console.log(this.P)
    this.AuthServ.adduser(this.P).subscribe(data => {
      if(data) {
        this.messageService.add({key: 'SS', severity: 'success', summary: 'Gestion des utilisateurs', detail: 'Utilisateur ajouté'});
        console.log("EEEE");
        this.ClearData();
      }else {
        this.messageService.add({key: 'SS', severity: 'warn', summary: 'Gestion des utilisateurs', detail: 'Utilisateur non ajouté'});
      }
    },error => {      this.messageService.add({key: 'SS', severity: 'danger', summary: error, detail:'une erreur est survenue'});
    });
  }

  ngOnInit() {
    this.displayboutique=true;
    this.AuthServ.getAllusers().subscribe(UserData =>{
      console.log(UserData);
      this.Users = UserData;
    });


    this.columns = [
      {label: 'Administrateur', value :'Admin'},
      { label: 'Coursier', value: 'Coursier' },
      { label: 'Agent Commercial', value: 'AgentCommercial' }
    ];

}

  /*onRowEditInit(rowData: any) {
      this.clonedPersonne[rowData.cin]= {...rowData}
  }*/
  onRowDelete(rowdata: any){
    this.AuthServ.deleteuser(rowdata.cin).subscribe(response=>{
      console.log(response)
      if(response){
        this.messageService.add({key:'SS', severity:'success',summary:'Gestion des utilisateurs',detail:'Utilisateur supprimé'})
      }else {
        this.messageService.add({key:'SS', severity:'warn',summary:'Gestion des utilisateurs',detail:'suppression a échouée'})
      }
    },error => {
      this.messageService.add({key:'SS', severity:'danger',summary:'Gestion des utilisateurs',detail:'Erreur lors du Suppression'})
    })
  }

  onRowEditSave(rowData: any) {

  }

  ChangeRole(Role: any) {
    if(Role === "AgentCommercial"){
      this.displayboutique=false;
    }else {
      this.displayboutique=true;
    }
  }
}
