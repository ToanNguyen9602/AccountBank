import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionComponent } from './components/transaction/transaction.component';
import { UpdateuserComponent } from './components/updateuser/updateuser.component';
import { SearchtransactionComponent } from './components/searchtransaction/searchtransaction.component';
import { SearchBetweenComponent } from './components/search-between/search-between.component';

const routes: Routes = [
  {path: "", component: TransactionComponent},
  {path: "transaction", component: TransactionComponent},
  {path: "updateuser", component: UpdateuserComponent},
  {path: "searchTransaction", component: SearchtransactionComponent},
  {path: "searchBetween", component: SearchBetweenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
