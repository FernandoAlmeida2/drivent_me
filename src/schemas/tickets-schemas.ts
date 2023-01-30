import { TicketTypeIdParam } from '@/controllers';
import Joi from 'joi';

export const ticketTypeSchema = Joi.object<TicketTypeIdParam>({
  ticketTypeId: Joi.number().integer().min(1).required(),
});
