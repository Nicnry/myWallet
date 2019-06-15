import { Storage } from '@ionic/storage';
import { Account } from '../model/account';
import { Transaction } from '../model/transaction';
import { reject } from 'q';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class DataProvider {
  public accounts: Array<Account> = [];
  public transactions: Array<Transaction> = [];
  public apiUrl = 'http://localhost:8000/api/nhy';
  private storage: Storage;
  private http: HttpClient;
  private internet: boolean;

  constructor(storage: Storage, http: HttpClient) {
    this.storage = storage;
    this.http = http;
  }

  /* Get methods */
  /* Get Accounts */
  public getApiAccounts(): Observable<any> {
    this.isOnline().then((val) => {

      this.accounts = [];
      let call = this.http.get(this.apiUrl+ '/accounts');

      call.subscribe(
        data => {
          this.accounts.push.apply(data);
          this.storage.set('accounts', data);
          return this.accounts;
        },
        err => {
          console.log(err);
          return err;
        }
      );

    }).catch(() => {
      this.getAccounts();
    });

    return;
  }

  public getAccounts(): Promise<any> {
    return this.storage.get('accounts');
  }

  public getApiAccount(id): Observable <any> {
    this.isOnline().then((val) => {
      console.log(id);
    }).catch(() => {
      console.log(id, 'error');
    });
    return;
  }

  public getAccount(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getAccounts().then((accounts) => {
        accounts['data'].forEach(account => {
          if (account.id == id) {
            resolve(account);
          }
        });
      }).catch( err => {
        console.log(err);
        reject(err);
      });
    });
  }

  public getApiTransactions(): Promise<any> {
    this.isOnline().then((val) => {

      this.transactions = [];
      let call = this.http.get(this.apiUrl + '/transactions');

      call.subscribe(
        data => {
          this.transactions.push.apply(data);
          this.storage.set('transactions', data);
          return this.transactions;
        },
        err => {
          console.log(err);
          return err;
        }
      );

    }).catch(() => {
      this.getTransactions();
    });

    return;
  }

  /* Get transactions */
  public getTransactions(): Promise<any> {
    return this.storage.get('transactions');
  }

  public getTransaction(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getTransactions().then((transactions) => {
        transactions.forEach(transaction => {
          if (transaction.id == id) {
            resolve(transaction);
          }
        });
      }).catch( err => {
        console.log(err);
        reject(err);
      });
    });
  }

  /* get Settings */
  public getSettingApi(): Promise<any> {
    return this.storage.get('api');
  }

  public getSettingColor(): Promise<any> {
    return this.storage.get('app_color');
  }

  /* Set methods */
  /* Set Account */
  public setAccount(name, favorite, value, id = null): Promise<any> {
    let accounts_array: Array<Account> = [];

    return new Promise((resolve, reject) => {
      this.getAccounts().then((accounts) => {

        if (accounts) {
          accounts['data'].forEach((account) => {
            accounts_array.push(account);
          });
          id == null ? id = accounts_array.length + 1: id = id;
          accounts_array.push(new Account(id, name, favorite, value));
          resolve (this.storage.set('accounts', {'data': accounts_array}));
        } else {
          resolve (this.storage.set('accounts', {'data': [new Account(1, name, favorite, value)]}));
        }

      });
    }).catch( err => {
      reject(err);
    });
  }

  /* Set Transactions */
  public setTransaction(value, account_id): Promise<any> {
    let transactions_array: Array<Transaction> = [];
    let accounts_array: Array<Account> = [];

    return new Promise((resolve, reject) => {
      this.getTransactions().then((transactions) => {

        if (transactions) {
          transactions['data'].forEach((transaction) => {

            transactions_array.push(transaction);
          });
          transactions_array.push(new Transaction(transactions_array.length + 1, value, account_id));

          resolve (this.storage.set('transactions', {'data': transactions_array}));
        } else {
          resolve (this.storage.set('transactions', {'data': [new Transaction(1, value, account_id)]}));
        }

      });

      this.getAccounts().then((accounts) => {
        accounts['data'].forEach(account => {
          if (account.id == account_id) {
            accounts_array.push(new Account(account.id, account.name, account.favorite, parseInt(account.value) + parseInt(value)));
          } else {
            accounts_array.push(account);
          }
          resolve (this.storage.set('accounts', {'data': accounts_array}));
        });
      });

    }).catch( err => {
      console.log(err);
      reject(err);
    });
  }

  /* set Settings */
  public setSettingApi(api = this.apiUrl + '/accounts'): Promise<any> {
    return this.storage.set('api', api);
  }

  public setSettingColor(color = '#ffffff'): Promise<any> {
    return this.storage.set('app_color', color);
  }

  /* check if is online */
  public isOnline(): Promise<any> {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        this.http.get(this.apiUrl + '/accounts').subscribe(
          data => {
            this.storage.set('online', true);
            resolve(true);
          },
          err => {
            this.storage.set('online', false);
            reject(false);
          }
        );
      },
      5000);
    });
  }

  /* Check if it's the first time we launch the app */
  public isFirstLaunch() {
    return new Promise((resolve, reject) => {
      this.storage.get('launch').then(launch => {
        if (launch === null) {
          this.storage.set('launch', 1);
          return resolve (true);
        }
        return resolve (false);
      });
    }).catch( err => {
      console.log(err);
      reject(err);
    });
  }

}
