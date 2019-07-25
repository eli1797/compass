import { Component, OnInit } from '@angular/core';

import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { AngularDelegate } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  subscription;

  magneticHeading: any;
  trueHeading: any;

  latLongHardcoded: any = '34, -86';

  constructor(private deviceOrientation: DeviceOrientation) {
  }

  ngOnInit() {
    this.logOrientation();
  }

  logOrientation() {
  // Get the device current compass heading
  this.deviceOrientation.getCurrentHeading().then((heading) => {
    this.magneticHeading = heading.magneticHeading;
    this.trueHeading = heading.trueHeading;
  }, (err) => {
    console.log(err);
  });
  //   (data: DeviceOrientationCompassHeading) => console.log(data),
  //   (error: any) => console.log(error)
  // );
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

}
