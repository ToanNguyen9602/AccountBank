import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BankserviceService } from 'src/app/services/bankservice.service';
import { Account } from 'src/models/account';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  updateUserForm: FormGroup;
  account: Account;

  constructor(
    private fb: FormBuilder,
    private bankService: BankserviceService,
    private messageService: MessageService,
    private datePipe: DatePipe
    ) { }

  ngOnInit(): void {
    this.account = new Account();
  }

  onAccIdInput(event: any) {
    let value: number = event.target.value.substring(3);

    if (!(value == 0 || value == null)) {
      this.bankService.getAcc(value).subscribe(
        (data: Account) => (this.account = data ),
        (error: HttpErrorResponse) => this.resetForm(error)
        );
    }
  }
  resetForm(error: HttpErrorResponse): void {
    this.toastError(error.error);
    this.ngOnInit();
  }
  toastError(mess: string): void {
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: mess })
  }
  onSubmit(): void {
    if (this.account.customerName.trim() == '' || this.account.customerName == null) {
      this.toastError("Input Name!");
      return;
    }
    if (this.account.email.trim() == '' || this.account.email == null) {
      this.toastError("Input Email!");
      return;
    }
    if (this.account.phone.trim() == '' || this.account.phone == null) {
      this.toastError("Input Phone!")
      return;
    }

    this.bankService.upDateAccount(this.account).subscribe(
      (data: boolean) => {
        (this.messageService.add({ key: 'tc', severity: 'success', summary: 'success', detail: 'Update User Succesfully!'}));
        this.bankService.getAcc(this.account.accId).subscribe((data: Account) => this.account = data);
      },
      (err: HttpErrorResponse) => (this.toastError(err.error))
    );
  }
}
