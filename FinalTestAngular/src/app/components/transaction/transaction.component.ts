import { Component, EventEmitter, OnInit } from '@angular/core';
import { Transaction } from 'src/models/trasaction';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { BankserviceService } from 'src/app/services/bankservice.service';
import { Account } from 'src/models/account';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactionDetail: Transaction = new Transaction();
  transactionForm: FormGroup;
  account: Account = null;
  dott: Date;
  constructor(
    private fb: FormBuilder,
    private bankService: BankserviceService,
    private messageService: MessageService,
    private datePipe: DatePipe
    ) { }

  ngOnInit(): void {
    let currDate = new Date();
    this.transactionForm = this.fb.group({
      accountId: ['', Validators.required],
      transMoney: [0, Validators.required],
      dot: [{value: this.datePipe.transform(currDate, 'dd/MM/yyyy'), disabled: true}, Validators.required],
      transType: [1, Validators.required]
    });

  }
  toastError(mess: string): void {
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: mess })
  }
  onSubmit():void {
    if (this.transactionForm.get("transMoney").value == 0 || this.transactionForm.get("transMoney").value == null) {
      this.toastError("Transfer Money is Invalid!");
      return;
    }
    this.transactionDetail.accId = this.transactionForm.get('accountId').value;
    this.transactionDetail.transMoney = this.transactionForm.get('transMoney').value;
    let [day, month, year] = this.transactionForm.get('dot').value.split('/')
    const dateObj = new Date(+year, +month - 1, +day)
    this.transactionDetail.dateOfTrans = dateObj;
    console.log(dateObj);
    this.transactionDetail.transType = this.transactionForm.get('transType').value;

    this.bankService.doTransaction(this.transactionDetail).subscribe(
      (mess: boolean) => {
        (this.messageService.add({ key: 'tc', severity: 'success', summary: 'success', detail: 'Succesfully!'}));
        this.bankService.getAcc(this.transactionDetail.accId).subscribe((data: Account) => {
          (this.account = data);
        });
        },
      (error: HttpErrorResponse) => this.resetForm(error)
    );
   
  }
  onAccIdInput(event: any) {
    let value: number = event.target.value.substring(3);
    if (value != 0 && value != null) {
      this.bankService.getAcc(value).subscribe(
        (data: Account) => (this.account = data ),
        (error: HttpErrorResponse) => this.resetForm(error)
        );
    }
  }

  resetForm(error: HttpErrorResponse): void {
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: error.error })
    this.account = null;
    this.ngOnInit();
  }
}
