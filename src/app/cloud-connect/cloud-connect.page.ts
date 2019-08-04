import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { LocationService } from '../services/location.service';
// import { BearingService } from '../services/bearing.service';

import { APIService } from '../API.service';

import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { DiagnosticService } from '../services/diagnostic.service';
import { BearingService } from '../bearing.service';


@Component({
  selector: 'app-cloud-connect',
  templateUrl: './cloud-connect.page.html',
  styleUrls: ['./cloud-connect.page.scss'],
  providers: [DiagnosticService]
})
export class CloudConnectPage implements OnInit {

  userName: string;
  statusDescription: string;
  id: any;

  private theirLat: number;
  private theirLong: number;
  theirName: string;

  allLocations: any;

  constructor(
    public platform: Platform,
    public bearingService: BearingService,
    private api: APIService,
    public diagnostic: DiagnosticService,
    private uuid: UniqueDeviceID) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.diagnostic.getLocationAvailable();

      this.bearingService.subscribeLocation();
      this.bearingService.subscribeOrientation();
    });
  }

  async createLocation() {

    this.uuid.get()
    .then((uuid: any) => this.id)
    .catch((error: any) => console.log(error));

    const newStatus = {
      id: this.id,
      name: this.userName,
      latitude: this.bearingService.getMyLat(),
      longitude: this.bearingService.getMyLong()
    };


    // mutation to create location
    const result = await this.api.CreateLocation(newStatus);

    console.log(result);
  }

  setFindee(location) {
    console.log(location);

    this.theirName = location.name;

    this.bearingService.setTheirLat(location.latitude);
    this.bearingService.setTheirLong(location.longitude);
  }


  async listLocations() {
    const cloudLocations = await this.api.ListLocations();

    this.allLocations = cloudLocations.items;
  }

}
