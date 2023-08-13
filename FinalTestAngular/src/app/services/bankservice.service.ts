import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from 'src/models/account';
import { Transaction } from 'src/models/trasaction';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BankserviceService {
  
  constructor(private http: HttpClient,
    private datePipe: DatePipe) { }

  public getAcc(accId: number) : Observable<Account> {

    let url: string = 'getAcc';

   return this.http.get<Account>(`${environment.apiUrl}/${url}`, {params: {accId: accId}});
  }

  public doTransaction(trans: Transaction) : Observable<boolean> {
    let url: string = 'transaction';
    return this.http.post<boolean>(`${environment.apiUrl}/${url}`, trans);
  }

  public upDateAccount(acc: Account) : Observable<boolean> {
    let url: string = 'updateAccount';
    return this.http.put<boolean>(`${environment.apiUrl}/${url}`, acc);
  }

  public searchTransaction(accId: number, transType: number) : Observable<Transaction[]> {
    let url: string ='searchTransaction';
    return this.http.get<Transaction[]>(`${environment.apiUrl}/${url}`, {params: {accId: accId, transtype: transType}});
  }

  public searchBetween(accId: number, dates: Date[]) : Observable<Transaction[]> {
    let url: string = 'searchBetween';


    return this.http.get<Transaction[]>(`${environment.apiUrl}/${url}`, {params: {accId: accId, start: this.datePipe.transform(dates[0], "yyyy-MM-dd"), end: this.datePipe.transform(dates[1], "yyyy-MM-dd")}})
  }
  
}
