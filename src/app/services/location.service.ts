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

  /**
   * This function calculates the distance between locations accounting for earths curvature
   * @param myLat starting latitude
   * @param myLong starting longitude
   * @param theirLat ending latitude
   * @param theirLong ending longitude
   */
  calculateDistance(myLat: number, myLong: number, theirLat: number, theirLong: number): number {
    if (myLat && myLong && theirLat && theirLong) {
      // haversine distance
      const earthRadius = 6371e3; // meters
      const φ1 = myLat * (Math.PI / 180);
      const φ2 = theirLat * (Math.PI / 180);
      const Δφ = (theirLat - myLat) * (Math.PI / 180);
      const Δλ = (theirLong - myLong) * (Math.PI / 180);

      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      const distMeters = earthRadius * c;

      return distMeters;
    }
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
