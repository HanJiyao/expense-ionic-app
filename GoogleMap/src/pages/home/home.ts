import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef; map: any;
  private markers = [];
  public zone: NgZone;
  constructor(public navCtrl: NavController, public geolocation: Geolocation, zone: NgZone)
  {
    this.zone = zone
  }
  ionViewDidLoad(){
    console.log("ionview did load");
    this.loadMap();
  }
  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {
    let latLng = new google.maps.LatLng(position.coords.latitude,
    position.coords.longitude);
    let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    google.maps.event.addListener(this.map, 'click', (event) => {
      this.addMarker(event.latLng);
    });
    
  }, (err) => {
      console.log(err);
    });
  }
  addMarker(latLng){
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: latLng,
    icon: iconBase + 'info-i_maps.png'
    });

    let content = "<h4>Information!</h4>";
    this.markers.push(marker);
    this.addInfoWindow(marker, content);

  }
  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    
    google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });
    
  }
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  search = { input: '' };
  searchItemsList = [];
  geocoder = new google.maps.Geocoder;
  selectedMarker = new google.maps.Marker;
  updateSearchResults(){
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
  // When autocomplete item is selected
  // updateFromResults(){
  //   if (this.search.input == '') {
  //   this.searchItemsList = [];
  //   return;
  //   }
  //   var input = document.getElementById('search.input');
   
  //  //autocomplete
  //  var defaultBounds = new google.maps.LatLngBounds(
  //   new google.maps.LatLng(-33.8902, 151.1759),
  //   new google.maps.LatLng(-33.8474, 151.2631));
  //   var options = {
  //   bounds: defaultBounds,
  //   types: ['establishment']
  //   };
   
  //   this.GoogleAutocomplete.getPlacePredictions({ input: this.search.input },
  //   (predictions, status) => {
  //   if (predictions != null) {
  //   this.searchItemsList = [];
  //   this.zone.run(() => {
  //     predictions.forEach((prediction) => {
  //       this.searchItemsList.push(prediction);
  //       });
  //       });
  //       }
  //     });
  //   }
  selectSearchResult(item){
    this.searchItemsList = [];
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        let marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position: results[0].geometry.location,
          map: this.map,
        });
        this.selectedMarker = marker;
        this.map.setCenter(results[0].geometry.location);
      }
    });
  }
  // displayRoute(){
  //   this.directionsService = new google.maps.DirectionsService()
  //   this.directionsDisplay = new google.maps.DirectionsRenderer()
  //   this.directionsDisplay.setMap(this.map)
  //   this.directionsService.route({
  //   origin: this.start,
  //   destination: this.end,
  //   travelMode: 'DRIVING'
  //  }, (response, status) => {
  //   if (status === 'OK') {
  //   this.directionsDisplay.setDirections(response)
  //   } else {
  //   window.alert('Directions request failed due to ' + status)
  //   }
  //   })
  //  }
}
