import app, { init } from '@/app';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { createUser } from '../factories';
import { createHotel } from '../factories/hotels-factory';
import { cleanDb, generateValidToken } from '../helpers';

beforeAll(async () => await init());

beforeEach(async () => await cleanDb());

const server = supertest(app);

describe('GET /hotels', async () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/hotels');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with empty array when there are no hotels created', async () => {
      const token = await generateValidToken();

      const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

      expect(response.body).toEqual([]);
    });

    it('should respond with status 200 and with existing hotels data', async () => {
      const token = await generateValidToken();

      const hotels = await createHotel();

      const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([
        {
            id: hotels.id,
            name: hotels.name,
            image: hotels.image,
            createdAt: hotels.createdAt.toISOString(),
            updatedAt: hotels.updatedAt.toISOString(),
        }
      ]);
    });
  });
});
