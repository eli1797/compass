import { Injectable } from '@angular/core';


import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';

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

  constructor(private deviceOrientation: DeviceOrientation) {}

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

  subscribe() {
  // Watch the device compass heading change
  this.subscription = this.deviceOrientation.watchHeading().subscribe((heading) => {
      this.magneticHeading = heading.magneticHeading;
      this.trueHeading = heading.trueHeading;
    }, (err) => {
      console.log(err);
    });
  }

  unsubscribe() {
  // Stop watching heading change
  this.subscription.unsubscribe();
  this.magneticHeading = '';
  this.trueHeading = '';
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
