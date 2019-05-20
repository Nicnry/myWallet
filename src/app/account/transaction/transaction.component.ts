import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Transaction } from '../../model/transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  private id = this.route.snapshot.paramMap.get('id');

  constructor(private storage: Storage, private route: ActivatedRoute) {

  }

  ngOnInit() {}

}
