import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocationService } from '../services/location.service';

import { APIService } from '../API.service';

@Component({
  selector: 'app-cloud-connect',
  templateUrl: './cloud-connect.page.html',
  styleUrls: ['./cloud-connect.page.scss'],
})
export class CloudConnectPage implements OnInit {

  userName: string;
  statusDescription: string;

  constructor(
    public platform: Platform,
    private locationService: LocationService,
    private api: APIService) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.locationService.logLocation();
      this.locationService.subscribeLocation();
    });
  }

  async createLocation() {


    const newStatus = {
      id: (Math.random() * 1000) + '',
      name: this.userName,
      latitude: this.locationService.getMyLat(),
      longitude: this.locationService.getMyLong()
    };


    // mutation to create location
    let result = await this.api.CreateLocation(newStatus);

    console.log(result);


  }

  lookupById() {
    console.log('Lookup by Id');
  }

}
