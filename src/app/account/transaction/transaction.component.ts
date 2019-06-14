import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../../model/transaction';
import { DataProvider } from 'src/app/providers/data';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  public data: DataProvider;
  private id = this.route.snapshot.paramMap.get('id');
  public transactions: Array<Transaction> = [];
  public solde;

  constructor(private route: ActivatedRoute, data: DataProvider) {
    this.data = data;
    this.getTransactions(this.id);
    this.getAccount(this.id);
  }

  public getTransactions(id): Promise<any> {
    this.data.getTransactions().then((transactions) => {
      transactions['data'].forEach(element => {
        if (element.account_id == this.id) {
          this.transactions.push(element);
        } else {
          this.transactions.push();
        }
      });
    });
    return;
  }

  public getAccount(id): Promise<any>{
    this.data.getAccount(id).then((account) => {
      this.solde = account.value;
    });
    return;
  }

  ngOnInit() {}

}
