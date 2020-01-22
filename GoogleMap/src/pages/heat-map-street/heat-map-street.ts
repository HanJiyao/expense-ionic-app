import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HeatService} from '../../providers/heatservice';

declare var google;
@Component({
  selector: 'page-heat-map-street',
  templateUrl: 'heat-map-street.html',
})
export class HeatMapStreetPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  results: string[];
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private heatService:HeatService) {
 
  }
  ionViewDidLoad() {
   this.initMap();
   }
  
   initMap() {
    // var center = new google.maps.LatLng(1.300676, 103.855772);
    // let mapOptions = {
    //   center: center,
    //   zoom: 17,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // }
   
    // //create basemap
    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
   
    let mapData = [];
    //get heatmap data
    this.heatService.getLocalData().subscribe(results => {
    this.results= results;
    for (let i = 0; i < results.length; i++) {
      let coords = results[i];
      let latLng = new google.maps.LatLng(coords[1], coords[0]);
      mapData.push({location:latLng, weight:Math.random()});
    }
   
    });
    var citymap = {
      chicago: {
        center: {lat: 41.878, lng: -87.629},
        population: 2714856
      },
      newyork: {
        center: {lat: 40.714, lng: -74.005},
        population: 8405837
      },
      losangeles: {
        center: {lat: 34.052, lng: -118.243},
        population: 3857799
      },
      vancouver: {
        center: {lat: 49.25, lng: -123.1},
        population: 603502
      }
    };
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: {lat: 37.090, lng: -95.712},
      mapTypeId: 'terrain'
    });
  
    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.
    for (var city in citymap) {
      // Add the circle for this city to the map.
      new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this.map,
        center: citymap[city].center,
        radius: Math.sqrt(citymap[city].population) * 100
      });
    }
    
  }
  
}
