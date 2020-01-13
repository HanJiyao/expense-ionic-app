import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
// For search bar
GoogleAutocomplete = new google.maps.places.AutocompleteService();
search = { input: '' };
to = { input: '' };
searchItemsList = [];
toItemsList = [];
geocoder = new google.maps.Geocoder;
selectedMarker = new google.maps.Marker;

private directionsService = new google.maps.DirectionsService();
  private directionsDisplay = new google.maps.DirectionsRenderer({
    map: this.map,
    suppressMarkers: true,
    preserveViewport: true
  });
  private start;
  private end;
  private waypts = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private zone: NgZone, public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchdirectionPage');
  }
  ngOnInit() {
    this.loadMap();
  }
  // Load the map to current location
loadMap() {

  this.geolocation.getCurrentPosition().then((position) => {
    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    this.selectedMarker = marker;
    
  }, (err) => {
    console.log(err);
  });
} //end loadMap
addInfoWindow(marker, content){
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
  
  google.maps.event.addListener(marker, 'click', () => {
  infoWindow.open(this.map, marker);
  });
  
}

  updateToResults(){
    if (this.to.input == '') {
      this.toItemsList = [];
      return;
    }
    var input = document.getElementById('to.input');
    //autocomplete
var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(-33.8902, 151.1759),
  new google.maps.LatLng(-33.8474, 151.2631));
  var options = {
    bounds: defaultBounds,
    types: ['establishment'] 
  };
  
   this.GoogleAutocomplete.getPlacePredictions({ input: this.to.input },
  (predictions, status) => {
    if (predictions != null) {
      this.toItemsList = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.toItemsList.push(prediction);
        });
      });
    }
  }); 
  }
 // Everytime search bar changes
 updateFromResults(){
  if (this.search.input == '') {
    this.searchItemsList = [];
    return;
  }
  var input = document.getElementById('search.input');
    
//autocomplete
var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(-33.8902, 151.1759),
  new google.maps.LatLng(-33.8474, 151.2631));
  var options = {
    bounds: defaultBounds,
    types: ['establishment'] 
  };
  
   this.GoogleAutocomplete.getPlacePredictions({ input: this.search.input },
  (predictions, status) => {
    if (predictions != null) {
      this.searchItemsList = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.searchItemsList.push(prediction);
        });
      });
    }
  }); 
}
selectToResult(item){
  this.toItemsList = [];
  this.to.input = item.description;//place the completed text in input field
  this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
    if(status === 'OK' && results[0]){
     let marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: results[0].geometry.location,
        map: this.map,
      });
      this.selectedMarker = marker;
      this.map.setCenter(results[0].geometry.location); 
      console.log("to location=" + results[0].geometry.location);
      this.start = results[0].geometry.location;
}
  });
}
selectSearchResult(item){
  this.searchItemsList = [];
this.search.input = item.description;
  this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
    if(status === 'OK' && results[0]){
      let marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: results[0].geometry.location,
        map: this.map,
      });
      this.selectedMarker = marker;
      this.map.setCenter(results[0].geometry.location); 
    this.end = results[0].geometry.location;
  }
  });
}

displayRoute(){
  this.directionsService = new google.maps.DirectionsService()
  this.directionsDisplay = new google.maps.DirectionsRenderer()
  this.directionsDisplay.setMap(this.map)
  this.directionsService.route({
   origin: this.start,
   destination: this.end,
   travelMode: 'DRIVING'
 }, (response, status) => {
    if (status === 'OK') {
      this.directionsDisplay.setDirections(response)
    } else {
      window.alert('Directions request failed due to ' + status)
    }
  })
 }
 clearMarkers() {
  var marker = new google.maps.Marker({});
  marker.setMap(null);
}
}
