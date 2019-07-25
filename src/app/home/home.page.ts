import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { BearingService } from '../bearing.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  subscription;

  magneticHeading: any;
  trueHeading: any;

  constructor(private deviceOrientation: DeviceOrientation, public bearingSerivce: BearingService,  public platform: Platform) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.bearingSerivce.subscribe();
      this.bearingSerivce.logOrientation();
    });
  }

  ngOnInit() {
    this.logOrientation();
    this.bearingSerivce.setMyLat(36);
    this.bearingSerivce.setMyLong(-86);

    // await this.bearingSerivce.subscribe();
    console.log('Bearing service magnetic heading');
    console.log(this.bearingSerivce.getMagneticHeading());
    console.log(this.bearingSerivce.logOrientation());
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

  direct() {
    // this.bearingSerivce.setTheirLat
    console.log('Called direct');
  }

}
