import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import client from './utils/getClient';
import seedDatabase from './utils/seedDatabase';
import prisma from '../src/prisma';

beforeEach(seedDatabase);

test('Should create new user', async () => {
  const createUser = gql`
    mutation {
      createUser(data: { name: "blue", email: "blue@icloud.com", password: "blue@icloud.com" }) {
        user {
          id
          name
          email
        }
        token
      }
    }
  `;
  const response = await client.mutate({
    mutation: createUser,
  });
  const exists = await prisma.exists.User({ id: response.data.createUser.user.id });
  expect(exists).toBe(true);
});
test('Should expose public author profile', async () => {
  const getUsers = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `;
  const response = await client.query({
    query: getUsers,
  });
  expect(response.data.users.length).toBe(1);
  expect(response.data.users[0].email).toBe(null);
  expect(response.data.users[0].name).toBe('red');
});
test('Should not login with bad credintials', async () => {
  const login = gql`
    mutation {
      login(data: { email: "red@icloud.com", password: "dju4i2Rt3ui" }) {
        token
        user {
          id
          name
          email
        }
      }
    }
  `;
  await expect(client.mutate({ mutation: login })).rejects.toThrow();
});
test('Should not signup user with short password', async () => {
  const createUser = gql`
    mutation {
      createUser(data: { name: "yellow", email: "yellow@icloud.com", password: "yellow" }) {
        token
        user {
          id
          name
          email
        }
      }
    }
  `;
  await expect(
    client.mutate({
      mutation: createUser,
    }),
  ).rejects.toThrow();
});
