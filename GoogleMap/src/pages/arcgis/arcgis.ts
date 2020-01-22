import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { loadModules } from 'esri-loader';

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
    'esri/views/MapView',
    'esri/layers/FeatureLayer'

    ]).then(([Map, MapView, FeatureLayer]) => {
   
    let map = new Map({
    basemap: 'hybrid'
    });
    this.mapView = new MapView({
      // create the map view at the DOM element in this component
      container: this.mapEl.nativeElement,
      center: [-12.287, -37.114],
      zoom: 12,
      map: map,
      extent: { // autocasts as new Extent()
        xmin: -9177811,
        ymin: 4247000,
        xmax: -9176791,
        ymax: 4247784,
        spatialReference: 102100
        }
      });
      let featureLayer = new FeatureLayer({
        url:
       "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0"
       });
       console.log("b4 feature");
       map.add(featureLayer);
        ///feature layer end
        console.log("after feature");
      })
      .catch(err => {
      console.log("ArcGIS: " + err);
      })
    }
}
