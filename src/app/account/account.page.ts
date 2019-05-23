import { Component, OnInit } from '@angular/core';
import { Account } from '../model/account';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import { DataProvider } from '../providers/data';
import { Transaction } from '../model/transaction';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  public data: DataProvider;
  public accounts: Array<Account> = [];
  public account;
  public isFirst;

  constructor(private storage: Storage, private router: Router) {
    this.data = new DataProvider(storage);
    this.getDataAccounts();
  }

  ngOnInit() {
  }

  public addAccount() {
    !this.accounts.length ? this.isFirst = 1 : this.isFirst = 2;
    if ( this.account != null ) {

      this.data.setAccount(
        new Account(
          this.isFirst,
          this.account,
          false,
          50000,
          [
            new Transaction(1, -2000),
            new Transaction(2, -50),
            new Transaction(3, -120),
            new Transaction(3, -120),
          ],
        )
      );

    } else {
      alert('Veuillez entrez un nom de compte.');
    }
    this.account = null;
  }

  public getDataAccounts() {
    this.data.getAccounts().then((accounts) => {
      if (accounts) {
        accounts.forEach(account => {
          this.accounts.push({
            id: account.id,
            name: account.name,
            favorite: account.favorite,
            value: account.value,
            transactions: account.transactions,
          });
        });
      }
    });
  }

  routeTransaction(id) {
    this.router.navigate(['account', id]);
  }


}
