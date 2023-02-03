import { AuthenticatedRequest } from '@/middlewares';
import hotelService from '@/services/hotels-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const hotels = await hotelService.getHotels();
    res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    console.log("aqui")
    res.sendStatus(httpStatus.NO_CONTENT);
  }
}
