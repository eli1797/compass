import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Toast } from '@ionic-native/toast/ngx';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {

  constructor(
    private diagnostic: Diagnostic,
    private toast: Toast
  ) { }

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
      this.toast.show('We kinda need to know your location. Don\'t worry we won\'t tell the FBI ;)', '5000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
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
      console.error("The following error occurred: " + error);
  });
  }
}
