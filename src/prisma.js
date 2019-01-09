import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/resolvers';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: 'thisismysupersecrettext',
  fragmentReplacements,
});

export { prisma as default };

// const createPostForUser = async (authorId, data) => {
//   const userExist = await prisma.exists.User({
//     id: authorId,
//   });
//   if (!userExist) {
//     throw new Error('User not found.');
//   }
//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId,
//           },
//         },
//       },
//     },
//     '{ author { id name email posts { id title body published } } }',
//   );
//   return post.author;
// };

// createPostForUser('cjqkqth0q001b0945zg4i4m1y', {
//   title: 'React and Redux',
//   body: 'Redux for everybody',
//   published: false,
// })
//   .then(user => console.log(JSON.stringify(user, undefined, 2)))
//   .catch(err => console.log(err.message));

// const updatePostForUser = async (postId, data) => {
//   const postExist = await prisma.exists.Post({
//     id: postId,
//   });
//   if (!postExist) {
//     throw new Error('Post not found');
//   }
//   const post = await prisma.mutation.updatePost(
//     {
//       data,
//       where: { id: postId },
//     },
//     '{ author { id name email posts { id title body published} } }',
//   );
//   return post.author;
// };

// updatePostForUser('cjqkuaq21002i09453jwovke7', {
//   title: 'Angie and Friends',
//   published: false,
// })
//   .then(user => console.log(JSON.stringify(user, undefined, 2)))
//   .catch(err => console.log(err.message));
