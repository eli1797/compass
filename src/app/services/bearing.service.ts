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
   * Getter for magnetic heading
   */
  public getMagneticHeading(): number {
    return this.magneticHeading;
  }
}
