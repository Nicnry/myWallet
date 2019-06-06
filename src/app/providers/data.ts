import { Storage } from '@ionic/storage';
import { Account } from '../model/account';
import { reject } from 'q';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class DataProvider {
  public accounts: Array<Account> = [];
  public apiUrl = 'http://localhost:8000/api/nhy';
  private storage: Storage;
  private http: HttpClient;
  private internet: boolean;

  constructor(storage: Storage, http: HttpClient) {
    this.storage = storage;
    this.http = http;
  }

  public getApiAccounts(): Observable<any> {
    this.isOnline().then((val) => {

      this.accounts = [];
      let call = this.http.get(this.apiUrl + '/accounts');

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
      console.log('the DB is offline');
    });

    return;
  }

  public setAccount(account): Promise<any> {
    return new Promise((resolve, reject) => {
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
    });
  }

  public getAccounts(): Promise<any> {
    return this.storage.get('accounts');
  }

  public getAccount(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getAccounts().then((accounts) => {
        accounts.forEach(account => {
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

  public isOnline(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + '/accounts').subscribe(
        data => {
          resolve(true);
        },
        err => {
          reject(false);
        }
      );
    });
  }

}
