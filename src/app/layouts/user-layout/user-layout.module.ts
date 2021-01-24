import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BoutiqueLayoutRoutes} from './user-layout.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {CommonModule} from '@angular/common';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {
  CardModule,
  ChartModule,
  ConfirmDialogModule,
  InputTextareaModule,
  RadioButtonModule,
  SplitButtonModule
} from 'primeng';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar'
import {UserProfileComponent} from "../../pages/user-profile/user-profile.component";
import {RegisterComponent} from "../../pages/register/register.component";
import {QrScannerComponent} from "../../pages/qr-scanner/qr-scanner.component";
import {TradeComponent} from "../../pages/trade/trade.component";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ClipboardModule} from "ngx-clipboard";
import {MenuModule} from "primeng/menu";
import {KeyFilterModule} from "primeng/keyfilter";


@NgModule({
    imports: [
        RouterModule.forChild(BoutiqueLayoutRoutes),
        ReactiveFormsModule,
        ToastModule,
        InputTextModule,
        PanelModule,
        MessageModule,
        MessagesModule,
        ButtonModule,
        DropdownModule,
        TableModule,
        CommonModule,
        FormsModule,
        DataViewModule,
        DialogModule,
        SplitButtonModule,
        InputNumberModule,
        CalendarModule,
        ConfirmDialogModule,
      FormsModule,
      HttpClientModule,
      NgbModule,
      ClipboardModule,
      ToastModule,
      TableModule,
      ButtonModule,
      MenuModule,
      InputTextModule,
      CalendarModule,
      DropdownModule,
      ReactiveFormsModule,
      PanelModule,
      DialogModule,
      MessageModule,
      CardModule,
      KeyFilterModule,
      ChartModule,
      RadioButtonModule,
      InputNumberModule,
      InputTextareaModule


    ],
  declarations : [
    UserProfileComponent,
    QrScannerComponent,
    TradeComponent

  ]
})
export class UserLayoutModule {}
