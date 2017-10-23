import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';


/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocketProvider {

  private socket;

  private clientRequestTS;
  private clientResponseTS;
  private serverRequestTS;
  private serverResponseTS;

  constructor() {
    console.log('Hello AppProvider Provider');
  }

  connect(url) {
    this.socket = io(url);

    return new Promise((resolve) => {
      this.socket.on('connect', resolve);
    });
  }

  sendMessage(message){
    this.clientRequestTS = Date.now();
    this.socket.emit('message', message);
  }

  getMessages() {
    let observable = new Observable(observer => {

      this.socket.on('message', (data) => {

        this.clientResponseTS = Date.now();

        this.serverRequestTS = data.serverRequestTS;
        this.serverResponseTS = data.serverResponseTS;

        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getOffset() {
    return Math.abs((this.serverRequestTS - this.clientRequestTS) + (this.serverResponseTS - this.clientResponseTS)) / 2;
  }

  getRoundTripDelay() {
    return Math.abs(this.clientResponseTS - this.clientRequestTS) - (this.serverResponseTS - this.serverRequestTS);
  }

}
