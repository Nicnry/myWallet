import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  public data: DataProvider;
  public api;
  public color;
  public settings = [];

  constructor(data: DataProvider) {
    this.data = data;
    this.setSettings();
    this.getSettings();
  }

  ngOnInit() {
  }

  public getSettings(): Promise<any> {
    this.data.getSettingApi().then(data => this.settings['api'] = data);
    this.data.getSettingColor().then(data => this.settings['app_color'] = data);
    console.log(this.settings);
    return;
  }

  public setSettings() {
    this.data.setSettingApi(this.api);
    this.data.setSettingColor();
  }

}
