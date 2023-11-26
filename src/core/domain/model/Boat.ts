import { IPosition } from "./Position";

export interface IBoat {
  boatName: string;
}

export class Boat implements IBoat{
  constructor(public boatName: string) {
    this.boatName = boatName
  }
}