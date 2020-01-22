import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class HeatService {

 constructor(public http: HttpClient) {

 }
 getLocalData(){
 let coordsArray = [];
 return this.http.get('assets/imgs/gyms.json')
 .map(res => {
 let data1= (res as any).features;
 for (let i = 0; i < data1.length; i++) {
 let coords = data1[i].geometry.coordinates;
 coordsArray.push(coords);
 }
 return coordsArray;
 });
} 
}