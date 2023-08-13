import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BankserviceService } from 'src/app/services/bankservice.service';
import { Account } from 'src/models/account';
import { Transaction } from 'src/models/trasaction';

@Component({
  selector: 'app-search-between',
  templateUrl: './search-between.component.html',
  styleUrls: ['./search-between.component.css']
})
export class SearchBetweenComponent {
  rangeDates: Date[];
  transactions: Transaction[];
  accId: number;

  constructor(
    private bankService: BankserviceService,
    private messageService: MessageService,
    ) { }

  ngOnInit(): void {
    this.transactions = null;
    this.accId = null;

  }
  onAccIdInput():void {
    if (this.rangeDates != null && this.rangeDates[1] != null) {
      if (this.accId != 0 && this.accId != null) {
        this.bankService.searchBetween(this.accId, this.rangeDates).subscribe(
          (data: Transaction[]) => (this.transactions = data),
          (err: HttpErrorResponse) => (this.resetForm(err))
        );
      }
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
