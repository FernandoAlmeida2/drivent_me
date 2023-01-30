import { prisma } from '@/config';
import { Ticket, TicketType } from '@prisma/client';

function findTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(enrollmentId: number): Promise<TicketResult> {
  const response = await prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
  return response;
}

async function findTicketById(ticketId: number): Promise<TicketResult> {
  const response = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    },
  });
  return response;
}

async function createTicket(newTicketData: NewTicketParams): Promise<TicketResult> {
  const responseTicket = await prisma.ticket.create({ data: newTicketData });
  const responseTicketType = await prisma.ticketType.findUnique({ where: { id: responseTicket.ticketTypeId } });
  return { ...responseTicket, TicketType: { ...responseTicketType } };
}

export type TicketResult = Ticket & { TicketType: TicketType };

async function updateTicket(updateTicketData: NewTicketParams, ticketId: number): Promise<void> {
  await prisma.ticket.update({
    where: { id: ticketId },
    data: updateTicketData,
  });
}

export type NewTicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

const ticketRepository = {
  findTicketTypes,
  findTicketByEnrollmentId,
  createTicket,
  findTicketById,
  updateTicket,
};

export default ticketRepository;
