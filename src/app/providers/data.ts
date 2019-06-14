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
  public setAccount(account): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getAccounts().then((accounts) => {
        if (accounts == null) {
          accounts = {'data': [account]};
          resolve (this.storage.set('accounts', accounts));
        } else {
          accounts['data'].push(account);
          resolve (this.storage.set('accounts', accounts));
        }
      });
    }).catch( err => {
      reject(err);
    });
    /* return new Promise((resolve, reject) => {
      this.getAccounts().then((accounts) => {
        if (accounts == null) {
          accounts = [account];
          resolve (this.storage.set('accounts', accounts));
        } else {
          accounts.push(account);
          resolve (this.storage.set('accounts', accounts));
        }
      });
    }).catch( err => {
      console.log(err);
      reject(err);
    }); */
  }

  /* Set Transactions */
  public setTransaction(transaction): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve (this.storage.set('transactions', [transaction]));
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
