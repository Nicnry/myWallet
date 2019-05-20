import { Component, OnInit } from '@angular/core';
import { Account } from '../model/account';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import { DataProvider } from '../providers/data';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  public data: DataProvider;
  public accounts: Array<Account> = [];
  public account;

  constructor(private storage: Storage, private router: Router) {
    this.data = new DataProvider(storage);
    this.getDataAccounts();
  }

  ngOnInit() {
  }

  public addAccount() {
    this.data.setAccount(new Account(1, this.account, false, 0, []));
    this.account = '';
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
