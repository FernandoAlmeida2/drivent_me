<<<<<<< HEAD
import { getTicket, getTicketTypes, postTicket } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketTypeSchema } from '@/schemas';
import { Router } from 'express';
=======
import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketTypes, getTickets, createTicket } from "@/controllers";
>>>>>>> 6146a32e37cdc6604449613bf54b8daaf83717bb

const ticketsRouter = Router();

ticketsRouter
<<<<<<< HEAD
  .all('/*', authenticateToken)
  .get('/types', getTicketTypes)
  .get('/', getTicket)
  .post('/', validateBody(ticketTypeSchema), postTicket);
=======
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("", getTickets)
  .post("", createTicket);
>>>>>>> 6146a32e37cdc6604449613bf54b8daaf83717bb

export { ticketsRouter };
