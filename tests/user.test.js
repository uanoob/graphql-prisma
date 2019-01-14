import 'cross-fetch/polyfill';
import {
  createUser, getProfile, getUsers, login,
} from './utils/operations';
import getClient from './utils/getClient';
import seedDatabase, { userOne } from './utils/seedDatabase';
import prisma from '../src/prisma';

const client = getClient();

beforeEach(seedDatabase);

test('Should create new user', async () => {
  const variables = {
    data: {
      name: 'blue',
      email: 'blue@icloud.com',
      password: 'blue@icloud.com',
    },
  };
  const response = await client.mutate({
    mutation: createUser,
    variables,
  });
  const exists = await prisma.exists.User({ id: response.data.createUser.user.id });
  expect(exists).toBe(true);
});
test('Should expose public author profile', async () => {
  const response = await client.query({
    query: getUsers,
  });
  expect(response.data.users.length).toBe(2);
  expect(response.data.users[0].email).toBe(null);
  expect(response.data.users[0].name).toBe('red');
});
test('Should not login with bad credintials', async () => {
  const variables = {
    data: {
      email: 'red@icloud.com',
      password: 'dju4i2Rt3ui',
    },
  };
  await expect(client.mutate({ mutation: login, variables })).rejects.toThrow();
});
test('Should not signup user with short password', async () => {
  const variables = {
    data: {
      name: 'yellow',
      email: 'yellow@icloud.com',
      password: 'yellow',
    },
  };
  await expect(
    client.mutate({
      mutation: createUser,
      variables,
    }),
  ).rejects.toThrow();
});
test('Should fetch user profile', async () => {
  const clientWithAuth = getClient(userOne.jwt);

  const { data } = await clientWithAuth.query({
    query: getProfile,
  });
  expect(data.me.id).toBe(userOne.user.id);
  expect(data.me.name).toBe(userOne.user.name);
  expect(data.me.email).toBe(userOne.user.email);
});
