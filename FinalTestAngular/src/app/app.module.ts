import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionComponent } from './components/transaction/transaction.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import * as moment from 'moment';
import { UpdateuserComponent } from './components/updateuser/updateuser.component';
import { InputTextModule } from 'primeng/inputtext';
import { SearchtransactionComponent } from './components/searchtransaction/searchtransaction.component';
import { TableModule } from 'primeng/table';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SearchBetweenComponent } from './components/search-between/search-between.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent,
    UpdateuserComponent,
    SearchtransactionComponent,
    SearchBetweenComponent,

  
  ],
  imports: [
    TableModule,
    ScrollPanelModule,
    InputTextModule,
    ButtonModule,
    RadioButtonModule,
    CalendarModule,
    DatePipe,
    BrowserAnimationsModule,
    ToastModule,
    InputNumberModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [MessageService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
