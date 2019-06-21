import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  public data: DataProvider;
  public api: string;
  public color: string;
  public settings = [];

  constructor(data: DataProvider) {
    this.data = data;
    this.getSettings();
  }

  ngOnInit() {
  }

  public getSettings() {
    this.data.getSettingApi().then(data => this.api = data);
    this.data.getSettingColor().then(data => this.color = data);
    return;
  }

  public setSettings() {
    this.data.setSettingApi(this.api);
    this.data.setSettingColor(this.color);
  }

  public defaultSettings() {
    this.data.setSettingApi();
    this.data.setSettingColor();
  }

}
