import 'cross-fetch/polyfill';
import {
  getPosts, getMyPosts, createPost, updatePost, deletePost,
} from './utils/operations';
import getClient from './utils/getClient';
import seedDatabase, { userOne, postOne, postTwo } from './utils/seedDatabase';
import prisma from '../src/prisma';

const client = getClient();

beforeEach(seedDatabase);

test('Should expose published posts', async () => {
  const response = await client.query({
    query: getPosts,
  });
  expect(response.data.posts.length).toBe(1);
  expect(response.data.posts[0].published).toBe(true);
});
test('Should fetch user posts', async () => {
  const clientWithAuth = getClient(userOne.jwt);

  const { data } = await clientWithAuth.query({
    query: getMyPosts,
  });
  expect(data.myPosts.length).toBe(2);
});
test('Should be able to update own post', async () => {
  const clientWithAuth = getClient(userOne.jwt);
  const variables = {
    id: postOne.post.id,
    data: {
      published: false,
    },
  };
  const { data } = await clientWithAuth.mutate({ mutation: updatePost, variables });
  const postExists = await prisma.exists.Post({
    id: postOne.post.id,
    published: false,
  });
  expect(data.updatePost.published).toBe(false);
  expect(postExists).toBe(true);
});
test('Should be able to create new post', async () => {
  const clientWithAuth = getClient(userOne.jwt);
  const variables = {
    data: {
      title: 'Post title',
      body: '...',
      published: true,
    },
  };
  const { data } = await clientWithAuth.mutate({
    mutation: createPost,
    variables,
  });
  expect(data.createPost.title).toBe('Post title');
  expect(data.createPost.body).toBe('...');
  expect(data.createPost.published).toBe(true);
});
test('Should be able delete post', async () => {
  const clientWithAuth = getClient(userOne.jwt);
  const variables = {
    id: postTwo.post.id,
  };
  await clientWithAuth.mutate({
    mutation: deletePost,
    variables,
  });
  const existPost = await prisma.exists.Post({
    id: postTwo.post.id,
  });
  expect(existPost).toBe(false);
});
