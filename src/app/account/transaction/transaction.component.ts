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
  private id = Number(this.route.snapshot.paramMap.get('id'));
  public transactions: Array<Transaction> = [];
  public solde;
  public account;
  public color: string;

  constructor(private route: ActivatedRoute, data: DataProvider) {
    this.data = data;
    this.getTransactions(this.id);
    this.getAccount(this.id);
    this.getSettingColor();
  }

  public getTransactions(id: number) {
    this.data.getTransactions().then((transactions) => {
      transactions['data'].forEach(element => {
        if (element.account_id == this.id) {
          this.transactions.unshift(element);
        } else {
          this.transactions.unshift();
        }
      });
    });
  }

  public getAccount(id: number) {
    this.data.getAccount(id).then((account) => {
      this.account = account.name;
      this.solde = account.value;
    });
  }

  public getSettingColor() {
    this.data.getSettingColor().then(data => this.color = data);
  }

  ngOnInit() {}

}
