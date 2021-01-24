import {Routes} from '@angular/router';

import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {RegisterComponent} from "../../pages/register/register.component";
import {QrScannerComponent} from "../../pages/qr-scanner/qr-scanner.component";
import {TradeComponent} from "../../pages/trade/trade.component";


export const BoutiqueLayoutRoutes : Routes = [
  { path: 'user-profile', component: UserProfileComponent},
  {path:'QrScanner', component: QrScannerComponent},
  {path:'trade', component: TradeComponent}

]
