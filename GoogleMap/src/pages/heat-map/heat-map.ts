import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HeatService} from '../../providers/heatservice';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
@Component({
 selector: 'page-heat-map',
 templateUrl: 'heat-map.html',
})
export class HeatMapPage {
 @ViewChild('map') mapElement: ElementRef;
 map: any;
 results: string[];

 constructor(public navCtrl: NavController, public navParams: NavParams, private heatService:HeatService, public geolocation: Geolocation) {

 }
 ionViewDidLoad() {
  this.initMap();
  }
 
  initMap() {
    var center = new google.maps.LatLng(1.380090, 103.848915);
  let mapOptions = {
    center: center,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
 
  //create basemap
  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
  let heatmapData = [];
  //get heatmap data
  this.heatService.getLocalData().subscribe(results => {
  this.results= results;
  for (let i = 0; i < results.length; i++) {
  let coords = results[i];
  let latLng = new google.maps.LatLng(coords[1], coords[0]);
  heatmapData.push(latLng);
 
  }
 
  });
  //create heatmap
  new google.maps.visualization.HeatmapLayer({
  data: heatmapData,
  dissipating: false,
  map: this.map
  });
 
 }
 heatMap(){
  
}
}