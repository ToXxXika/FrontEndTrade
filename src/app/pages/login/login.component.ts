import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {MessageService} from "primeng/api";
import {AuthServiceService} from "../../Services/auth-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }

        :host ::ng-deep .custom-toast .ui-toast-message {
            background: #FC466B;
            background: -webkit-linear-gradient(to right, #3F5EFB, #FC466B);
            background: linear-gradient(to right, #3F5EFB, #FC466B);
        }

        :host ::ng-deep .custom-toast .ui-toast-message div {
            color: #ffffff;
        }

        :host ::ng-deep .custom-toast .ui-toast-message.ui-toast-message-info .ui-toast-close-icon {
            color: #ffffff;
        }
    `],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  private CookieCinValue: string ;
  private CookiePasswordValue: string ; // need to fix Cookies Configuration
  constructor(private authService: AuthServiceService, private router: Router,private cookieService: CookieService,private messageService: MessageService) {}
  public LoadLocalstorageKeys(KeyName: string):string {
    switch (KeyName) {
      case 'KeyName': {
        return 'nameLocal';
      }
      case 'Keysurname': {
        return 'surnameLocal';
      }
      case 'KeyRole': {
        return 'RoleLocal';
      }
      case 'KeyMail': {
        return 'MailLocal';
      }
      case 'KeyCin': {
        return 'CinLocal';
      }
      case 'KeyTag': {
        return 'Localuser';
      }
      case 'KeyTel': {
        return 'NumLocal';
      }
      default :
        alert('KeyNotFound');
        break;
    }
  }
  VerifUser() {
    const username = (document.getElementById('cin') as HTMLInputElement).value;
    const motdepasse = (document.getElementById('motdepasse') as HTMLInputElement).value;
    if (this.CheckInputs(username,motdepasse)) {
      this.authService.getUser(username, motdepasse).subscribe((res) => {
        console.log(res)
        const that = this ;
        if(res){
          this.messageService.add({key:"SS",severity:"success",summary:'Welcome',detail:'Bienvenue dans notre hi'})
          this.authService.getAllusers().subscribe(data =>{
            console.log(data)
            data.forEach(function(item){
              console.log(item)
              console.log(username)
              if(item.username== username){

                // function Wall
                localStorage.setItem(that.LoadLocalstorageKeys('KeyName'),item['name']);
                localStorage.setItem(that.LoadLocalstorageKeys('Keysurname'),item['surname']);
                localStorage.setItem(that.LoadLocalstorageKeys('KeyCin'),item['cin']);
                localStorage.setItem(that.LoadLocalstorageKeys('KeyMail'),item['mail']);
                localStorage.setItem(that.LoadLocalstorageKeys('KeyTag'),item['username']);
                localStorage.setItem(that.LoadLocalstorageKeys('KeyTel'),item['telephone']);
              }
            })
          })
          this.router.navigateByUrl('/dashboard');
        }else {
          this.messageService.add({key:"SS",severity:"error",summary:'Erreur',detail:'Either your password or username is wrong'})
        }
      },error => {
        console.log(error)
      });
    }
  }
  //Pour la verification des Champs du formulaire
  CheckInputs(username:any,motdepasse: any):boolean{
    if((username.length==0)||(motdepasse.length==0)){
      this.messageService.add({key:"SS",severity:"warn",detail:"les champs sont vides "});
      return  false ;
    }else {
      return true ;
    }
  }
  SaveCookies(){
    const  cin = (document.getElementById('cin') as HTMLInputElement).value;
    const motdepasse = (document.getElementById('motdepasse') as HTMLInputElement).value;
    if((Object.keys(cin).length == 0) && (Object.keys(motdepasse).length == 0)){
       this.messageService.add({key:"Error",severity:"Error",detail:"les champs sont vides merci de les remplir"});
    }else {
      this.cookieService.set("CIN", cin, 3);
      this.cookieService.set("motdepasse", motdepasse, 3);
    }
  };
  ngOnInit() {
     localStorage.clear();
    this.CookieCinValue = this.cookieService.get('CIN');
    this.CookiePasswordValue = this.cookieService.get('motdepasse');
  }

}
