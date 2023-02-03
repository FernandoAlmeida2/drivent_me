import hotelRepository from '@/repositories/hotel-repository';

async function getHotels() {
  const hotels = await hotelRepository.findHotels();

  return hotels;
}

const hotelService = {
  getHotels,
};

export default hotelService;