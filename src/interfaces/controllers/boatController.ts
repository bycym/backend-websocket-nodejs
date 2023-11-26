import express, { Request, Response } from 'express';
import { BoatService } from '../../application/boatService';
import { BoatRepositoryImpl } from '../../infrastructure/persistence/boatRepositoryImpl';
import { PositionRepositoryImpl } from '@infrastructure/persistence/positionRepositoryImpl';

const boatRepository = new BoatRepositoryImpl();
const positionRepository = new PositionRepositoryImpl();
const boatService = new BoatService(boatRepository,positionRepository);

const boatController = express.Router();

boatController.put('/updatePosition/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { newPosition } = req.body;

  try {
    const updatedBoat = await boatService.updatePosition(id, newPosition);

    if (updatedBoat) {
      res.status(200).json(updatedBoat);
    } else {
      res.status(404).json({ message: 'Boat not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default boatController;
