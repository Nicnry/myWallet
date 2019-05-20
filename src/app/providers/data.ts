import { Storage } from '@ionic/storage';
import { Account } from '../model/account';

export class DataProvider {
  public accounts: Array<Account> = [];

  constructor(private storage: Storage) {}

  public setAccount(account) {
    this.getAccounts().then((accounts) => {
      if (accounts == null) {
        accounts = [account];
        this.storage.set('accounts', accounts);
      } else {
        accounts.push(account);
        this.storage.set('accounts', accounts);
      }
    });
  }

  public getAccounts(): Promise<any> {
    return this.storage.get('accounts');
  }

}
