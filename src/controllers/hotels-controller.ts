import { AuthenticatedRequest } from '@/middlewares';
import hotelService from '@/services/hotels-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelService.getHotels(userId);

    res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "NotFoundError") {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }
    if (error.name === "PaymentRequiredError") {
      res.sendStatus(httpStatus.PAYMENT_REQUIRED);
      return;
    }
    res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;
  const { userId } = req;
  try {
    const hotelRooms = await hotelService.getHotelRooms(userId, Number(hotelId));

    res.status(httpStatus.OK).send(hotelRooms);
  } catch (error) {
    if (error.name === "NotFoundError") {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }
    if (error.name === "PaymentRequiredError") {
      res.sendStatus(httpStatus.PAYMENT_REQUIRED);
      return;
    }
    res.sendStatus(httpStatus.NO_CONTENT);
  }
}
