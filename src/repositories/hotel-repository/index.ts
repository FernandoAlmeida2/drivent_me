import { prisma } from '@/config';

async function findHotels() {
  return prisma.hotel.findMany();
}

const hotelRepository = {
  findHotels,
};

export default hotelRepository;