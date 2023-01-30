import { prisma } from '@/config';
import { Payment } from '@prisma/client';

function findPaymentByTicketId(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({ where: { ticketId } });
}

async function createPayment(newPaymentData: NewPaymentParams): Promise<Payment> {
  const response = await prisma.payment.create({ data: newPaymentData });
  return response;
}

export type NewPaymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

const paymentRepository = {
  findPaymentByTicketId,
  createPayment,
};

export default paymentRepository;
