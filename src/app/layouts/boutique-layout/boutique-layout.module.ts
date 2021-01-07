import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BoutiqueLayoutRoutes} from './boutique-layout.routing';
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
import {ConfirmDialogModule, SplitButtonModule} from 'primeng';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar'


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
        ConfirmDialogModule


    ],
  declarations : [

  ]
})
export class BoutiqueLayoutModule {}
