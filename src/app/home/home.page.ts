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

  constructor(private pickerCtrl: PickerController, data: DataProvider) {
    this.data = data;
    this.ngOnInit();
    this.data.getApiAccounts();
    console.log(this.data.isOnline());
  }

  async showAccounts() {
    let options = [];
    this.data.getAccounts().then((accounts) => {
      accounts['data'].forEach(element => {
        options.push({
          text: element.name,
          value: element.name,
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
      this.accountPicker = col.options[col.selectedIndex].text;
    });
  }

  public setTransaction() {
    alert('Doesnt work !')
    this.data.getAccounts().then((accounts) => {
      accounts.forEach(element => {
        if (element.name == 'Poste') {
          this.transaction = new Transaction(element.transactions.length + 1, 200);
        }
      });
    });
    return true;
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
            { text: 'Dépense', value: 'depense' },
            { text: 'Reçu', value: 'recu' }
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('picker');
      console.log(col.selectedIndex);
      this.picker = col.options[col.selectedIndex].text;
    });
  }

  ngOnInit() {}
}
