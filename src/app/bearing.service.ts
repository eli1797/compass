import { Injectable } from '@angular/core';


import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class BearingService {

  myLat: number;
  myLong: number;

  theirLat: number;
  theirLong: number;

  // subscription to device orientation
  subscription;

  //bearing
  magneticHeading: number;
  trueHeading: number;
  navBearing: number;
  navDistance: number;

  match: string;

  constructor(private deviceOrientation: DeviceOrientation, private geoLocation: Geolocation) {}

  calculateBearing() {
    // check if all the required variables are defined
    // believe this fails if at 0
    if (this.myLat && this.myLong && this.theirLat && this.theirLong) {

      // formula is correct (I believe) after converting to radians
      const longDif = (this.theirLong - this.myLong) * (Math.PI / 180);
      const y = Math.sin(longDif) * Math.cos(this.theirLat * (Math.PI / 180));
      const x = Math.cos(this.myLat * (Math.PI / 180)) * Math.sin(this.theirLat * (Math.PI / 180)) -
      Math.sin(this.myLat * (Math.PI / 180)) * Math.cos(this.theirLat * (Math.PI / 180)) * Math.cos(longDif);
      const degBearing = Math.atan2(y, x) * (180 / Math.PI);

      this.navBearing = Math.abs(degBearing);
      console.log('Bearing: ', this.navBearing);
    }
  }

  calculateDistance() {
    // haversine distance
    if (this.myLat && this.myLong && this.theirLat && this.theirLong) {
      const earthRadius = 6371e3; // meters
      const φ1 = this.myLat * (Math.PI / 180);
      const φ2 = this.theirLat * (Math.PI / 180);
      const Δφ = (this.theirLat - this.myLat) * (Math.PI / 180);
      const Δλ = (this.theirLong - this.myLong) * (Math.PI / 180);

      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      const d = earthRadius * c;

      this.navDistance = d;
      console.log("Distance: ", this.navDistance);
    }
  }

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

      if (this.theirLat && this.theirLong) {
        this.calculateDistance();
        this.calculateBearing();
      }
      });
  }

  subscribeOrientation() {
  // Watch the device compass heading change
  this.subscription = this.deviceOrientation.watchHeading().subscribe((heading) => {
      this.magneticHeading = heading.magneticHeading;
      this.trueHeading = heading.trueHeading;

      if (this.navBearing) {
        const difference = Math.abs(this.magneticHeading - this.navBearing);
        // strings are bad practice but trying to go quickly
        if (difference < 15) {
          this.match = "success";
        } else if (difference < 40) {
          this.match = "secondary";
        } else if (difference < 80) {
          this.match = "warning";
        } else {
          this.match = "danger";
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  unsubscribeOrientation() {
  // Stop watching heading change
  this.subscription.unsubscribe();
  this.magneticHeading = NaN;
  this.trueHeading = NaN;

  this.match = "primary";
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
}
