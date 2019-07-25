import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { BearingService } from '../bearing.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [BearingService]
})
export class HomePage implements OnInit {

  subscription;

  magneticHeading: any;
  trueHeading: any;

  constructor(private deviceOrientation: DeviceOrientation, public bearingSerivce: BearingService,  public platform: Platform) {
    
  }

  ngOnInit() {
    this.bearingSerivce.setMyLat(36);
    this.bearingSerivce.setMyLong(-86);

    // await this.bearingSerivce.subscribe();
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.bearingSerivce.subscribe();
      this.bearingSerivce.logOrientation();
    });
  }

  direct() {
    // this.bearingSerivce.setTheirLat
    console.log('Called direct');
  }

}
