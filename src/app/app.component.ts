import { Component } from '@angular/core';
import { Platform, LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { FormGroup, FormBuilder} from "@angular/forms";
import {SocketProvider} from "../providers/socket/socketProvider";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  serverAddressForm: FormGroup;
  connected: boolean;
  loader: any;
  error: string;

  constructor(private fb: FormBuilder, private socketProvider: SocketProvider,
              public loadingCtrl: LoadingController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit() {
    this.serverAddressForm = this.fb.group({
      address: `http://localhost:3000`
    });
    this.connected = false;
  }

  presentLoading() {
    this.error = null;
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 30000
    });
    this.loader.present();

    setTimeout(() => {
      this.error = 'Unable to connect to server';
      this.loader.dismiss();
    }, 5000);
  }

  connect2Server() {
    this.presentLoading();

    this.socketProvider.connect(this.serverAddressForm.get('address').value).then(() => {
      this.connected = true;
      this.loader.dismiss();
    });
  }
}

