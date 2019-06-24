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

  constructor(data: DataProvider) {
    this.data = data;
    this.setChanges();
    this.getChanges();
  }

  public setChanges() {
    let changes: Array<Change> = [];

    changes.push(new Change(1, 'franc suisse', 'CHF', 1));
    changes.push(new Change(2, 'dollar', 'USD', 0.98));
    changes.push(new Change(3, 'euro', 'EUR', 1.11));

    return this.data.setChange(changes);
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
