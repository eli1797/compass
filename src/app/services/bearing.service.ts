import { Injectable } from '@angular/core';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';

@Injectable({
  providedIn: 'root'
})
export class BearingService {

  // subscription to device orientation
  private subscription;

  private magneticHeading: number;
  private trueHeading: number;

  constructor(private deviceOrientation: DeviceOrientation) { }


  /**
   * Get the device current compass heading
   * console.log() it
   */
  logOrientation() {
    this.deviceOrientation.getCurrentHeading().then((heading) => {
      this.magneticHeading = heading.magneticHeading;
      this.trueHeading = heading.trueHeading;
      console.log(this.magneticHeading, this.trueHeading);
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * Watch and update the device compass heading
   */
  subscribeOrientation() {
    this.subscription = this.deviceOrientation.watchHeading().subscribe((heading) => {
        this.magneticHeading = heading.magneticHeading;
        this.trueHeading = heading.trueHeading;
      }, (err) => {
        console.log(err);
      });
  }

  /**
   * Stop watching the device compass heading
   * Reset the saved heading to NaN
   */
  unsubscribeOrientation() {
    // Stop watching heading change
    this.subscription.unsubscribe();
    this.magneticHeading = NaN;
    this.trueHeading = NaN;
  }

  /**
   * This function calculates the bearing to travel between locations
   * @param myLat starting latitude
   * @param myLong starting longitude
   * @param theirLat ending latitude
   * @param theirLong ending longitude
   */
  calculateBearing(myLat: number, myLong: number, theirLat: number, theirLong: number): number {
    // check if all the required variables are defined
    // fails if variables are 0, NaN, None
    if (myLat && myLong && theirLat && theirLong) {
      // formula is correct (I believe) after converting to radians
      const longDif = (theirLong - myLong) * (Math.PI / 180);
      const y = Math.sin(longDif) * Math.cos(theirLat * (Math.PI / 180));
      const x = Math.cos(myLat * (Math.PI / 180)) * Math.sin(theirLat * (Math.PI / 180)) - Math.sin(myLat * (Math.PI / 180)) * Math.cos(theirLat * (Math.PI / 180)) * Math.cos(longDif);
      const degBearing = Math.atan2(y, x) * (180 / Math.PI);

      return degBearing;
    }
  }

  /**
   * Getter for magnetic heading
   */
  public getMagneticHeading(): number {
    return this.magneticHeading;
  }
}
