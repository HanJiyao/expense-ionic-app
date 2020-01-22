import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { loadModules } from 'esri-loader';

/**
 * Generated class for the ArcgisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-arcgis',
  templateUrl: 'arcgis.html',
})
export class ArcgisPage implements OnInit {
  @ViewChild('map') mapEl: ElementRef;
  mapView:any = null;
  constructor(public navCtrl: NavController, public platform: Platform) {
  }
  ngOnInit() {
    this.getGeo()
  }
  async getGeo() {
    await this.platform.ready();
    // Load the mapping API modules
    return loadModules([
    'esri/Map',
    'esri/views/MapView'
    ]).then(([Map, MapView]) => {
   
    let map = new Map({
    basemap: 'hybrid'
    });
    this.mapView = new MapView({
      // create the map view at the DOM element in this component
      container: this.mapEl.nativeElement,
      center: [-12.287, -37.114],
      zoom: 12,
      map: map,
     
      }
      });
      })
      .catch(err => {
      console.log("ArcGIS: " + err);
      }
}
