import { getTicket, getTicketTypes, postTicket } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketTypeSchema } from '@/schemas';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketTypes)
  .get('/', getTicket)
  .post('/', validateBody(ticketTypeSchema), postTicket);

export { ticketsRouter };
