import bcrypt from 'bcryptjs';
import prisma from '../../src/prisma';

const seedDatabase = async () => {
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
};

export { seedDatabase as default };
