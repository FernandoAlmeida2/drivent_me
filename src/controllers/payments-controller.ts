import { invalidDataError } from '@/errors';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { Payment } from '@prisma/client';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response): Promise<void> {
  const { ticketId } = req.query;
  const { userId } = req;

  try {
    if (!ticketId) {
      throw invalidDataError(['You must send a valid ticketId!']);
    }
    const response: Payment = await paymentsService.getPaymentByTicketId(Number(ticketId), userId);

    res.status(200).send(response);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      res.status(httpStatus.NOT_FOUND).send(error.message);
      return;
    }
    if (error.name === 'InvalidDataError') {
      res.status(httpStatus.BAD_REQUEST).send(error.details);
      return;
    }
    res.sendStatus(httpStatus.UNAUTHORIZED);
    return;
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response): Promise<void> {
  const { userId } = req;
  const { ticketId, cardData } = req.body as PaymentRequest;
  try {
    const result: Payment = await paymentsService.postPayment(
      { ticketId, cardIssuer: cardData.issuer, cardLastDigits: cardData.number.slice(-4) },
      userId,
    );
    res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      res.status(httpStatus.NOT_FOUND).send(error.message);
      return;
    }
    res.sendStatus(httpStatus.UNAUTHORIZED);
    return;
  }
}

export type PaymentRequest = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: string;
    name: string;
    expirationDate: Date;
    cvv: string;
  };
};
