const Query = {
  users(parent, args, { prisma }, info) {
    const operationArgs = {};
    if (args.query) {
      operationArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
          {
            email_contains: args.query,
          },
        ],
      };
    }
    return prisma.query.users(operationArgs, info);
  },
  posts(parent, args, { prisma }, info) {
    const operationArgs = {};
    if (args.query) {
      operationArgs.where = {
        OR: [
          {
            title_contains: args.query,
          },
          {
            body_contains: args.query,
          },
        ],
      };
    }
    return prisma.query.posts(operationArgs, info);
  },
  comments(parent, args, { prisma }, info) {
    const operationArgs = {};
    if (args.query) {
      operationArgs.where = {
        text_contains: args.query,
      };
    }
    return prisma.query.comments(operationArgs, info);
  },
  me() {
    return {
      id: '123456',
      name: 'Angie',
      email: 'angie@icloud.com',
    };
  },
  post() {
    return {
      id: '4567321',
      title: 'GraphQl',
      body: '',
      published: false,
    };
  },
};

export { Query as default };
