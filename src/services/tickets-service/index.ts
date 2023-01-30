import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository, { TicketResult } from '@/repositories/ticket-repository';
import { TicketType } from '@prisma/client';

async function getTicketTypes(): Promise<TicketType[]> {
  const result = await ticketRepository.findTicketTypes();
  return result;
}

async function getTicket(userId: number): Promise<TicketResult> {
  const enrollmentExists = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentExists) {
    throw notFoundError();
  }
  const result = await ticketRepository.findTicketByEnrollmentId(enrollmentExists.id);

  if (!result) {
    throw notFoundError();
  }
  return result;
}

async function createTicket(ticketTypeId: number, userId: number): Promise<TicketResult> {
  const enrollmentExists = await enrollmentRepository.findWithAddressByUserId(userId);
  const status = 'RESERVED';

  if (!enrollmentExists) {
    throw notFoundError();
  }

  const response = await ticketRepository.createTicket({ ticketTypeId, enrollmentId: enrollmentExists.id, status });
  return response;
}

const ticketsService = {
  getTicketTypes,
  getTicket,
  createTicket,
};

export default ticketsService;
