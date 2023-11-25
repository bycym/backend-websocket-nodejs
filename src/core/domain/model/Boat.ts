export interface IPosition {
  latitude: number;
  longitude: number;
  heading: number
}
export interface IBoat {
  boatName: string;
  position: IPosition
}
export class Boat implements IBoat{
  constructor(public boatName: string, public position: IPosition) {
    this.boatName = boatName
    this.position = position
  }
}