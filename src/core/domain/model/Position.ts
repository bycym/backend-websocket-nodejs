export interface IPosition {
  idBoat: string;
  latitude: number;
  longitude: number;
  heading: number
}

export class Position implements IPosition{
  constructor(public idBoat: string, public latitude: number, public longitude: number, public heading: number) {
    this.idBoat = idBoat
    this.latitude = latitude
    this.longitude = longitude
    this.heading = heading
  }
}