const users = [
  {
    id: '1',
    name: 'Angie',
    email: 'angie@icloud.com',
    age: 25,
  },
  {
    id: '2',
    name: 'Bred',
    email: 'bred@icloud.com',
    age: 19,
  },
  {
    id: '3',
    name: 'Doe',
    email: 'doe@icloud.com',
    age: 31,
  },
];

const posts = [
  {
    id: '1',
    title: 'Graphql for beginners',
    body: 'Some test text',
    published: true,
    author: '1',
  },
  {
    id: '2',
    title: 'About Graphql',
    body: 'Post here',
    published: false,
    author: '1',
  },
  {
    id: '3',
    title: 'For professional: Graphql',
    body: 'message & comments',
    published: true,
    author: '2',
  },
];

const comments = [
  {
    id: '45302',
    text: 'Just also react.',
    author: '3',
    post: '1',
  },
  {
    id: '198',
    text: 'Mongoose library.',
    author: '1',
    post: '1',
  },
  {
    id: '891',
    text: 'Mongo DB challenge.',
    author: '1',
    post: '2',
  },
  {
    id: '6982',
    text: 'Redux router and everybody.',
    author: '2',
    post: '3',
  },
];

const resolvers = {
  Query: {
    users(root, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()));
    },
    posts(root, args, { User }, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(
        post => post.title.toLowerCase().includes(args.query.toLowerCase())
          || post.body.toLowerCase().includes(args.query.toLowerCase()),
      );
    },
    comments(parent, args, ctx, info) {
      return comments;
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
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.post === parent.id);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.author === parent.id);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find(post => post.id === parent.post);
    },
  },
};

export { resolvers as default };
