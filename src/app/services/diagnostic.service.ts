import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {

  constructor(private diagnostic: Diagnostic) { }

  /**
   * Call back function for getLocationAvailable
   */
  locationEval(status) {
    console.log("location available: " + status);
    // If we can't get location then send the user to settings for the app
    if (!status) {
      console.log("This only works if we have your location");
      this.openSettings();
      //should show a toast here
    }
  }

  getLocationAvailable() {
    this.diagnostic.isLocationAvailable().then((status) => this.locationEval(status), function(error){
      console.error("The following error occured: " + error);
    });
  }

  openSettings() {
    this.diagnostic.switchToSettings().then(function(){
      console.log("Successfully switched to Settings app");
  }, function(error){
      console.error("The following error occurred: "+error);
  });
  }
}
