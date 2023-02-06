import { getHotelRooms, getHotels } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken)
  .get('', getHotels)
  .get('/:hotelId', getHotelRooms);
  
export { hotelsRouter };
