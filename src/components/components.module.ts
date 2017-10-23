import { NgModule } from '@angular/core';
import { ServerTimeComponent } from './server-time/server-time';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from '../app/app.component';


@NgModule({
	declarations: [ServerTimeComponent],
	imports: [IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
	exports: [ServerTimeComponent]
})
export class ComponentsModule {}
