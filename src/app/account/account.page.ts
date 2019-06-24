import { Component, OnInit } from '@angular/core';
import { Account } from '../model/account';
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
  public account: any;
  public value: any;
  public isFirst: any;
  public favorite: any;
  public color: string;

  constructor(private router: Router, data: DataProvider) {
    this.data = data;
    this.data.getAccounts().then((accounts) => {
      if (accounts) {
        accounts['data'].forEach(account => {
          this.accounts.push({
            id: account.id,
            name: account.name,
            favorite: account.favorite,
            value: account.value,
          });
        });
      }
    });

    this.getSettingColor();
  }

  ngOnInit() {
  }

  /* public addAccount() {
    !this.accounts.length ? this.isFirst = 1 : this.isFirst = 2;
    if ( this.account != null ) {
      let account = new Account(
        this.isFirst,
        this.account,
        this.favorite,
        this.value
      );

      //this.data.setAccount(account);

    } else {
      alert('Veuillez entrez un nom de compte.');
    }
    this.account = this.value = this.favorite = null;
  } */

  public setAccount() {
    this.data.setApiAccount(this.account, this.favorite, this.value);
    this.account = this.value = this.favorite = null;
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
          });
        });
      }
    });
  }

  public getSettingColor() {
    this.data.getSettingColor().then(data => this.color = data);
  }

  routeTransaction(id) {
    this.router.navigate(['account', id]);
  }


}
