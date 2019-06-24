import { Component } from '@angular/core';
import { DataProvider } from '../providers/data';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  accountPicker = '';
  changePicker = '';
  picker = '';
  public data: DataProvider;
  public value;
  public account;
  public transaction;
  public selectedAccount;
  public selectedChange;
  public selectedPicker;
  public color: string;
  public user: string;

  constructor(private pickerCtrl: PickerController, data: DataProvider) {
    this.data = data;
    this.ngOnInit();
    this.data.getApiAccounts();
    this.data.getApiTransactions();
    this.getSettingColor();
    this.getUser();
  }

  getUser() {
    this.data.getUser().then((user) => {
      this.user = user;
    });
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

  async showChanges() {
    let options = [];
    this.data.getChanges().then((changes) => {
      changes['data'].forEach(change => {
        options.push({
          id: change.id,
          text: change.slug,
          value: change.value,
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
    let changePicker = await this.pickerCtrl.create(opts);
    changePicker.present();
    changePicker.onDidDismiss().then(async data => {
      let col = await changePicker.getColumn('picker');
      this.selectedChange = await changePicker.getColumn('picker');
      this.changePicker = col.options[col.selectedIndex].text;
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
    this.data.setApiTransaction(
      this.selectedPicker + this.value,
      this.selectedChange.options[this.selectedChange.selectedIndex].id,
      this.selectedAccount.options[this.selectedAccount.selectedIndex].id
    );
    this.accountPicker = this.picker = this.changePicker = this.value = null;
  }

  public getSettingColor() {
    this.data.getSettingColor().then(data => this.color = data);
  }

  ngOnInit() {}
}
