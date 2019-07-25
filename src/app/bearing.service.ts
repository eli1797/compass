import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BearingService {

  myLat: number;
  myLong: number;

  myMagHeading: number;

  theirLat: number;
  theirLong: number;

  constructor() { }

  public getMyLat(): number {
    return this.myLat;
  }

  public setMyLat(value: number) {
    this.myLat = value;
  }

  public getMyLong(): number {
    return this.myLong;
  }

  public setMyLong(value: number) {
    this.myLong = value;
  }

  public getTheirLat(): number {
    return this.theirLat;
  }

  public setTheirLat(value: number) {
    this.theirLat = value;
  }

  public getTheirLong(): number {
    return this.theirLong;
  }

  public setTheirLong(value: number) {
    this.theirLong = value;
  }

  public geyMyMagHeading(): number {
    return this.myMagHeading;
  }

  public setMyMagHeading(value: number) {
    this.myMagHeading = value;
  }


}
