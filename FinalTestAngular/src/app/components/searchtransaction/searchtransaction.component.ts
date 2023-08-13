import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BankserviceService } from 'src/app/services/bankservice.service';
import { Account } from 'src/models/account';
import { Transaction } from 'src/models/trasaction';

@Component({
  selector: 'app-searchtransaction',
  templateUrl: './searchtransaction.component.html',
  styleUrls: ['./searchtransaction.component.css']
})
export class SearchtransactionComponent implements OnInit {
  transactions: Transaction[];
  accId: number;
  transType: number;
  constructor(
    private fb: FormBuilder,
    private bankService: BankserviceService,
    private messageService: MessageService,
    ) { }
  ngOnInit(): void {
    this.transactions = null;
    this.accId = null;
    this.transType = 1;
  }
  onAccIdInput():void {

    if (this.accId != 0 && this.accId != null) {
      console.log(this.transType);
      this.bankService.searchTransaction(this.accId, this.transType).subscribe(
        (data: Transaction[]) => (this.transactions = data),
        (err: HttpErrorResponse) => (this.resetForm(err))
      );
    }
  }
  toastError(mess: string): void {
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: mess })
  }
  resetForm(error: HttpErrorResponse): void {
    this.toastError(error.error);
    this.transactions = null;
    if (error.status === 400) {
      this.accId = null;
    }
  }

}
