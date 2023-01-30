import { notFoundError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentRepository, { NewPaymentParams } from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { Payment } from '@prisma/client';

async function getPaymentByTicketId(ticketId: number, userId: number): Promise<Payment> {
  const ticketExists = await ticketRepository.findTicketById(ticketId);

  if (!ticketExists) {
    throw notFoundError();
  }
  const enrollmentExists = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentExists || enrollmentExists.id !== ticketExists.enrollmentId) {
    throw unauthorizedError();
  }
  const paymentExists = await paymentRepository.findPaymentByTicketId(ticketId);

  if (!paymentExists) {
    throw notFoundError();
  }

  return paymentExists;
}

async function postPayment(paymentData: PaymentWithoutValueParams, userId: number): Promise<Payment> {
  const ticketExists = await ticketRepository.findTicketById(paymentData.ticketId);

  if (!ticketExists) {
    throw notFoundError();
  }
  const enrollmentExists = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentExists) {
    throw notFoundError();
  }

  if (enrollmentExists.id !== ticketExists.enrollmentId) {
    throw unauthorizedError();
  }

  const response = await paymentRepository.createPayment({ ...paymentData, value: ticketExists.TicketType.price });
  const status = 'PAID';
  await ticketRepository.updateTicket(
    { ticketTypeId: ticketExists.ticketTypeId, enrollmentId: ticketExists.enrollmentId, status },
    ticketExists.id,
  );
  return response;
}

type PaymentWithoutValueParams = Omit<NewPaymentParams, 'value'>;

const paymentsService = {
  getPaymentByTicketId,
  postPayment,
};

export default paymentsService;
