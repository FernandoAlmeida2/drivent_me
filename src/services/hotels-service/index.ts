import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelRepository from '@/repositories/hotel-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { paymentRequiredError } from './errors';
import { validateUserToSearchHotels } from './utils';

async function getHotels(userId: number) {
  const enrollmentExists = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentExists) {
    throw notFoundError();
  }
  const ticketExists = await ticketRepository.findTicketByEnrollmentId(enrollmentExists.id);

  if (!ticketExists) {
    throw notFoundError();
  }

  if (!validateUserToSearchHotels(ticketExists)) {
    throw paymentRequiredError();
  }

  const hotels = await hotelRepository.findHotels();

  return hotels;
}

async function getHotelRooms(userId: number, hotelId: number) {
  const enrollmentExists = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentExists) {
    throw notFoundError();
  }
  const ticketExists = await ticketRepository.findTicketByEnrollmentId(enrollmentExists.id);

  if (!ticketExists) {
    throw notFoundError();
  }

  if (!validateUserToSearchHotels(ticketExists)) {
    throw paymentRequiredError();
  }

  const hotelRooms = await hotelRepository.findRoomsByHotelId(hotelId);

  if (!hotelRooms) {
    throw notFoundError();
  }

  return hotelRooms;
}

const hotelService = {
  getHotels,
  getHotelRooms,
};

export default hotelService;
