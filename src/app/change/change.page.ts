import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Transaction } from '../model/transaction';
import { Change } from '../model/change';

@Component({
  selector: 'app-change',
  templateUrl: './change.page.html',
  styleUrls: ['./change.page.scss'],
})
export class ChangePage implements OnInit {
  public data: DataProvider;
  public changes: Array<Change> = [];
  public change: string;
  public slug: string;
  public value: number;

  constructor(data: DataProvider) {
    this.data = data;
    this.getChanges();
  }

  public setChange() {
    this.data.setChange(this.change, this.slug, this.value);
    this.change = this.value = this.slug = null;
  }

  public getChanges() {
    this.data.getChanges().then((changes) => {
      if (changes) {
        changes['data'].forEach(change => {
          this.changes.push(change);
        });
      }
    })
  }

  ngOnInit() {
  }

}
