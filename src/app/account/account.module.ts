import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account.page';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  },
  {
    path: ':id',
    component: TransactionComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccountPage, TransactionComponent]
})
export class AccountPageModule {}
