import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-cloud-connect',
  templateUrl: './cloud-connect.page.html',
  styleUrls: ['./cloud-connect.page.scss'],
})
export class CloudConnectPage implements OnInit {

  constructor(
    public platform: Platform,
    private location: LocationService) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.location.logLocation();
    });
  }

  lookupById() {
    console.log("Lookup by Id");
  }

}
