import { Injectable } from '@angular/core';


import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class BearingService {

  myLat: number;
  myLong: number;

  myMagHeading: number;

  theirLat: number;
  theirLong: number;

  // bearing
  subscription;

  magneticHeading: any;
  trueHeading: any;

  constructor(private deviceOrientation: DeviceOrientation, private geoLocation: Geolocation) {}

  logOrientation() {
    // Get the device current compass heading
    this.deviceOrientation.getCurrentHeading().then((heading) => {
      this.magneticHeading = heading.magneticHeading;
      this.trueHeading = heading.trueHeading;
      console.log(this.magneticHeading, this.trueHeading);
    }, (err) => {
      console.log(err);
    });
  }

  logLocation() {
    this.geoLocation.getCurrentPosition().then((resp) => {
      this.myLat = resp.coords.latitude;
      this.myLong = resp.coords.longitude;
      console.log(this.myLat, this.myLong);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  subscribeLocation() {
    let watch = this.geoLocation.watchPosition();
      watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      this.myLat = data.coords.latitude;
      this.myLong = data.coords.longitude;
      });
  }

  subscribeOrientation() {
  // Watch the device compass heading change
  this.subscription = this.deviceOrientation.watchHeading().subscribe((heading) => {
      this.magneticHeading = heading.magneticHeading;
      this.trueHeading = heading.trueHeading;
    }, (err) => {
      console.log(err);
    });
  }

  unsubscribeOrientation() {
  // Stop watching heading change
  this.subscription.unsubscribe();
  this.magneticHeading = '';
  this.trueHeading = '';
  }

  unsubscribeLocation() {
    this.myLat = NaN;
    this.myLong = NaN;
  }

  public getMagneticHeading(): number {
    return this.magneticHeading;
  }

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

  public getTheirLat(): number {
    return this.theirLat;
  }

  public setTheirLat(value: number) {
    this.theirLat = value;
  }

  public getTheirLong(): number {
    return this.theirLong;
  }

  public setTheirLong(value: number) {
    this.theirLong = value;
  }

  public geyMyMagHeading(): number {
    return this.myMagHeading;
  }

  public setMyMagHeading(value: number) {
    this.myMagHeading = value;
  }


}
