import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { BearingService } from '../bearing.service';
import { DiagnosticService } from '../services/diagnostic.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [BearingService, DiagnosticService]
})
export class HomePage implements OnInit {

  // watchButton = document.getElementById("watch");

  subscription;

  magneticHeading: any;
  trueHeading: any;

  constructor(
    public bearingSerivce: BearingService,  
    public platform: Platform,
    public diagnostic: DiagnosticService) {}

  ngOnInit() {
    this.bearingSerivce.setTheirLat(33.76);
    this.bearingSerivce.setTheirLong(-84.37);

    

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      // check and ask for location available
      this.diagnostic.getLocationAvailable();

      this.bearingSerivce.logOrientation();
      this.bearingSerivce.subscribeOrientation();
      
      this.bearingSerivce.logLocation();
      this.bearingSerivce.subscribeLocation();

      // this.diagnostic.openSettings();
    });
  }

  watchMe() {
    this.bearingSerivce.subscribeOrientation();
    this.bearingSerivce.subscribeLocation();
  }

  stopWatching() {
    this.bearingSerivce.unsubscribeOrientation();
    this.bearingSerivce.unsubscribeLocation();
  }

  calculateStats() {
    this.bearingSerivce.calculateBearing();
    this.bearingSerivce.calculateDistance();
  }

}
