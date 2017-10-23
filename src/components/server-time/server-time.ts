import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import {SocketProvider} from "../../providers/socket/socketProvider";

/**
 * Generated class for the ServerTimeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'server-time',
  templateUrl: 'server-time.html'
})
export class ServerTimeComponent {

  connection: any;

  roundTripDelay;
  timeOffset;
  timeOutDelay;

  constructor(platform: Platform, private socketProvider: SocketProvider) {
    platform.ready().then(() => {});
  }

  ngOnInit() {

    this.connection = this.socketProvider.getMessages().subscribe(message => {

      this.roundTripDelay = this.socketProvider.getRoundTripDelay();
      this.timeOffset = this.socketProvider.getOffset();

      if (message) {
        this.timeOutDelay = setTimeout(() => {
          this.socketProvider.sendMessage({text: 'hello world'})
        }, 2000);
      }
    });
    this.connection = this.socketProvider.sendMessage({text: 'hello world'});
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
    clearTimeout(this.timeOutDelay);
  }

  getRotate(val) {
    return `rotate(${val}deg)`
  }

  getClientTime() {
    return new Date();
  }

  getServerTime() {
    return new Date(Date.now() - this.timeOffset);
  }
}
