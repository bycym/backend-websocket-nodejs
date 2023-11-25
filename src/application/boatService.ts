import { Boat, IPosition } from "@domain/model/Boat";
import { BoatRepository } from "@domain/repository/boatRepository";
import { BoatDomainService } from "@domain/service/boatDomainService";


export class BoatService implements BoatDomainService {
  constructor(private boatRepository: BoatRepository) {}

  async updatePosition(boatId: string, newPosition: IPosition): Promise<Boat | null> {
    const boat = await this.boatRepository.findById(boatId);
    if (!boat) {
      return null;
    }

    // Your business logic can go here

    boat.position = newPosition;
    const updatedBoat = await this.boatRepository.update(boat);
    return updatedBoat;
  }
}
