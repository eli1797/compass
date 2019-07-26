import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private myLat: number;
  private myLong: number;

  constructor(private geoLocation: Geolocation) { }

  /**
   * Gets, sets, and prints the lat and long of the device
   */
  logLocation() {
    this.geoLocation.getCurrentPosition().then((resp) => {
      this.myLat = resp.coords.latitude;
      this.myLong = resp.coords.longitude;
      console.log(this.myLat, this.myLong);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  /**
   * Subscribe to updates of the device location
   * Sets the private members of the service: lat, long
   */
  subscribeLocation() {
    let watch = this.geoLocation.watchPosition();
    watch.subscribe((data) => {
      this.myLat = data.coords.latitude;
      this.myLong = data.coords.longitude;
    }, (err) => {
      console.log(err);
    });
  }

  /** Getters and setters **/
  
  public getMyLat(): number {
    return this.myLat;
  }

  public setMyLat(value: number) {
    this.myLat = value;
  }

  public getMyLong(): number {
    return this.myLong;
  }

  public setMyLong(value: number) {
    this.myLong = value;
  }
}
