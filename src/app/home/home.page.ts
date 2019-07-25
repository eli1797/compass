import { Component, OnInit } from '@angular/core';

import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { AngularDelegate } from '@ionic/angular';
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

  constructor(private deviceOrientation: DeviceOrientation, public bearingSerivce: BearingService) {
  }

  ngOnInit() {
    this.logOrientation();
    this.bearingSerivce.setMyLat(36);
    this.bearingSerivce.setMyLong(-86);
  }

  logOrientation() {
  // Get the device current compass heading
  this.deviceOrientation.getCurrentHeading().then((heading) => {
    this.magneticHeading = heading.magneticHeading;
    this.trueHeading = heading.trueHeading;
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
