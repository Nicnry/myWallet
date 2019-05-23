import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
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

  constructor(private storage: Storage, private route: ActivatedRoute) {
    this.data = new DataProvider(storage);
    this.getTransactions(this.id);

    this.data.getAccount(this.id).then((account) => {
      this.solde = account.value;
    });

  }

  public getTransactions(id): Promise<any> {
    this.data.getAccounts().then((accounts) => {
      accounts.forEach(account => {
        if (account.id == id) {
          account.transactions.forEach(transaction => {
            this.transactions.push(transaction);
          });
        }
      });
    });
    return;
  }

  ngOnInit() {}

}
