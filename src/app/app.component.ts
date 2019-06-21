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
      title: 'Settings',
      url: '/setting',
      icon: 'options'
    }
  ];
  public online;

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

        /* const toast = await this.toastCtrl.create({
          message: "Tout a été enregistré sur l'API",
          duration: 2000,
          color: 'dark'
        });
        toast.present(); */

      });
    },
    5000);
  }

}
