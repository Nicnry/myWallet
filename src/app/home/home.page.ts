import { Component } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Transaction } from '../model/transaction';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  accountPicker = '';
  picker = '';
  public data: DataProvider;
  public value;
  public account;
  public transaction;
  public selectedAccount;
  public selectedPicker;

  constructor(private pickerCtrl: PickerController, data: DataProvider) {
    this.data = data;
    this.ngOnInit();
    this.data.getApiAccounts();
    this.data.getApiTransactions();
  }

  async showAccounts() {
    let options = [];
    this.data.getAccounts().then((accounts) => {
      accounts['data'].forEach(element => {
        options.push({
          id: element.id,
          text: element.name,
          value: element.value,
        });
      });
    });

    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done',
        }
      ],
      columns: [
        {
          name: 'picker',
          options: options
        }
      ]
    };
    let accountPicker = await this.pickerCtrl.create(opts);
    accountPicker.present();
    accountPicker.onDidDismiss().then(async data => {
      let col = await accountPicker.getColumn('picker');
      this.selectedAccount = await accountPicker.getColumn('picker');
      this.accountPicker = col.options[col.selectedIndex].text;
    });
  }

  async showMethod() {
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done',
        }
      ],
      columns: [
        {
          name: 'picker',
          options: [
            { text: 'Dépense', value: '-' },
            { text: 'Reçu', value: '' }
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('picker');
      this.selectedPicker = col.options[col.selectedIndex].value;
      this.picker = col.options[col.selectedIndex].text;
    });
  }

  public setTransaction() {
    return this.data.setTransaction(this.selectedPicker + this.value, this.selectedAccount.options[this.selectedAccount.selectedIndex].id);
  }

  ngOnInit() {}
}
