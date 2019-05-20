import { Component } from '@angular/core';
import { DataProvider } from '../../providers/data';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public data: DataProvider;

  constructor(private storage: Storage) {
    
  }

  public setTransaction() {
    return true;
  }



}
