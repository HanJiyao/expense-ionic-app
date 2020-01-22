import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HeatMapPage } from '../pages/heat-map/heat-map';
import { HeatMapStreetPage } from '../pages/heat-map-street/heat-map-street';
import { ExercisePlacesPage } from '../pages/exercise-places/exercise-places'
import { ArcgisPage } from '../pages/arcgis/arcgis'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import {HeatService} from '../providers/heatservice';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HeatMapPage,
    HeatMapStreetPage,
    ExercisePlacesPage,
    ArcgisPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HeatMapPage,
    HeatMapStreetPage,
    ExercisePlacesPage,
    ArcgisPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    HeatService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
