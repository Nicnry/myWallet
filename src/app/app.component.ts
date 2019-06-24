import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataProvider } from './providers/data';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Comptes',
      url: '/account',
      icon: 'wallet'
    },
    {
      title: 'Monnaies',
      url: '/change',
      icon: 'card'
    },
    {
      title: 'Settings',
      url: '/setting',
      icon: 'options'
    }
  ];
  public online;
  public user: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public data: DataProvider,
    private toastCtrl: ToastController,
  ) {
    this.initializeApp();
    this.data = data;
    this.toastCtrl = toastCtrl;
    this.api();
    this.getUser();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async api() {
    setInterval(() => {
      this.data.api().then(async (val) => {
        this.online = val;
      });
    },
    5000);
  }

  async getUser() {
    this.data.getUser().then((user) => {
      this.user = user;
    });
  }

  scanCode(){
    this.data.barcodeScanner.scan().then(barcodeData => {
      this.data.setUser(barcodeData.text).then((user) => {
        this.user = user;
      });
     }).catch(err => {
         alert('Votre appareil ne fonctionne pas correctement');
     });
  }

}
