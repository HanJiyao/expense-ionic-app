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
    var locations = [
      ['Coogee Beach', 1.377468, 103.851806],
      ['Manly Beach', 1.375162, 103.852901],
      ['Maroubra Beach', 1.379152, 103.851002]
    ];
    var locations2 = [
      ['Bondi Beach', 1.380728, 103.851431],
      ['Cronulla Beach', 1.3775526, 103.848373],
    ];
    new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FFFFFF',
        fillOpacity: 0.35,
        map: this.map,
        center: latLng,
        radius: 1000
      });

      var image = '/../assets/imgs/avatar-default-icon.png';

    for (var i = 0; i < locations.length; i++) { 
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: this.map,
        icon: image
      });
    }
    var image2 = '/../assets/imgs/Webp.net-resizeimage.png'
    for (var i = 0; i < locations2.length; i++) { 
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations2[i][1], locations2[i][2]),
        map: this.map,
        icon: image2
      });
    }
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
