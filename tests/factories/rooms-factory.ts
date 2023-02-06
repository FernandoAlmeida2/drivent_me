import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: `Room ${faker.datatype.number(1000)}`,
      capacity: faker.datatype.number(5),
      hotelId,
    },
  });
}
