import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocationService } from '../services/location.service';

import { APIService } from '../API.service';

import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-cloud-connect',
  templateUrl: './cloud-connect.page.html',
  styleUrls: ['./cloud-connect.page.scss'],
})
export class CloudConnectPage implements OnInit {

  userName: string;
  statusDescription: string;
  id: any;

  constructor(
    public platform: Platform,
    private locationService: LocationService,
    private api: APIService,
    private uuid: UniqueDeviceID) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.locationService.logLocation();
      this.locationService.subscribeLocation();
    });
  }

  async createLocation() {

    this.uuid.get()
    .then((uuid: any) => this.id)
    .catch((error: any) => console.log(error));

    const newStatus = {
      id: this.id,
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
