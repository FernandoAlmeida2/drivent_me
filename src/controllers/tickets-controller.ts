import { AuthenticatedRequest } from '@/middlewares';
import { TicketResult } from '@/repositories/ticket-repository';
import ticketsService from '@/services/tickets-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const response = await ticketsService.getTicketTypes();

    res.status(httpStatus.OK).send(response);
  } catch (error) {
    res.sendStatus(httpStatus.UNAUTHORIZED);
    return;
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response): Promise<void> {
  const { userId } = req;
  try {
    const response = await ticketsService.getTicket(userId);

    res.status(200).send(response);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      res.status(httpStatus.NOT_FOUND).send(error.message);
      return;
    }
    res.sendStatus(httpStatus.UNAUTHORIZED);
    return;
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response): Promise<void> {
  const { userId } = req;
  const { ticketTypeId } = req.body as TicketTypeIdParam;
  try {
    const result: TicketResult = await ticketsService.createTicket(ticketTypeId, userId);

    res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      res.status(httpStatus.NOT_FOUND).send(error.message);
      return;
    }
    res.sendStatus(httpStatus.UNAUTHORIZED);
    return;
  }
}

export type TicketTypeIdParam = { ticketTypeId: number };
