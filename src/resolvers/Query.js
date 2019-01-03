const Query = {
  users(root, args, { db }) {
    if (!args.query) {
      return db.users;
    }
    return db.users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()));
  },
  posts(root, args, { db }) {
    if (!args.query) {
      return db.posts;
    }
    return db.posts.filter(
      post => post.title.toLowerCase().includes(args.query.toLowerCase())
        || post.body.toLowerCase().includes(args.query.toLowerCase()),
    );
  },
  comments(parent, args, { db }) {
    return db.comments;
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
