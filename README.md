This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## Socket based client-server round-trip distance

### Dependencies:
* ionic
* cordova
* node.js

### Install dependencies:
```bash
$ sudo npm install -g ionic cordova
$ gil clone https://github.com/yudarik/socketRoundTrip.git
$ cd socketRoundTrip && npm install
```

Then, to run it in develop mode, cd into `socketRoundTrip` and run:

```bash
$ ionic serve
$ node server (as separate process)
```
To run in production mode:
```bash
$ npm run build
$ npm run start
```
Open browser and navigate to http://localhost:8080


### download and install android app to run directly from your phone:
https://github.com/yudarik/socketRoundTrip/blob/master/roundTrip-android-app.apk

### Live Demo
https://socket-round-trip.herokuapp.com/
