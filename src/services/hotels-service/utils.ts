import { Ticket, TicketStatus, TicketType } from '@prisma/client';

export function validateUserToSearchHotels(ticket: Ticket & { TicketType: TicketType }) {
  const paidCase = ticket.status === TicketStatus.PAID;
  
  if (!paidCase) return false;

  const remoteParticipationCase = ticket.TicketType.isRemote;

  if(remoteParticipationCase) return false;

  const includeHotelCase = ticket.TicketType.includesHotel;

  if(!includeHotelCase) return false;

  return true;

}
