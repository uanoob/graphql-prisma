import 'cross-fetch/polyfill';
import prisma from '../src/prisma';
import getClient from './utils/getClient';
import { getComments, deleteComment } from './utils/operations';
import seedDatabase, { userOne, userTwo, commentOne } from './utils/seedDatabase';

const client = getClient();

beforeEach(seedDatabase);

test('Should fetch comments', async () => {
  const { data } = await client.query({
    query: getComments,
  });
  expect(data.comments.length).toBe(2);
});

test('Should be able delete own comment', async () => {
  const clientWithAuth = getClient(userOne.jwt);
  const variables = {
    id: commentOne.comment.id,
  };
  await clientWithAuth.mutate({
    mutation: deleteComment,
    variables,
  });
  const exists = await prisma.exists.Comment({
    id: commentOne.comment.id,
  });
  expect(exists).toBe(false);
});

test('Should not delete other users comment', async () => {
  const clientWithAuth = getClient(userTwo.jwt);
  const variables = {
    id: commentOne.comment.id,
  };
  await expect(
    clientWithAuth.mutate({
      mutation: deleteComment,
      variables,
    }),
  ).rejects.toThrow();
});
