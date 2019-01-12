import 'cross-fetch/polyfill';
import ApolloBoost, { gql } from 'apollo-boost';
import bcrypt from 'bcryptjs';
import prisma from '../src/prisma';

const client = new ApolloBoost({
  uri: 'http://localhost:4000',
});

beforeEach(async () => {
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  const user = await prisma.mutation.createUser({
    data: {
      name: 'red',
      email: 'red@icloud.com',
      password: bcrypt.hashSync('red@icloud.com'),
    },
  });
  await prisma.mutation.createPost({
    data: {
      title: 'Published post 1',
      body: '...',
      published: true,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  await prisma.mutation.createPost({
    data: {
      title: 'Unpublished post 2',
      body: '...',
      published: false,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });
});

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
test('Should expose published posts', async () => {
  const getPosts = gql`
    query {
      posts {
        id
        title
        body
        published
      }
    }
  `;
  const response = await client.query({
    query: getPosts,
  });
  expect(response.data.posts.length).toBe(1);
  expect(response.data.posts[0].published).toBe(true);
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
