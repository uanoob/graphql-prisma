const users = [
  {
    id: '78323e9d-d049-403c-a970-c995ded430e7',
    name: 'Angie',
    email: 'angie@icloud.com',
    age: 23,
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
    id: 'beb073f2-6888-4e24-b237-c6296cb7d6d7',
    title: 'Graphql for beginners',
    body: 'Some test text',
    published: true,
    author: '78323e9d-d049-403c-a970-c995ded430e7',
  },
  {
    id: '2',
    title: 'About Graphql',
    body: 'Post here',
    published: false,
    author: '78323e9d-d049-403c-a970-c995ded430e7',
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
    id: '322db8e4-fc3b-4645-8540-ae13da4d21a4',
    text: 'Just also react.',
    author: '3',
    post: 'beb073f2-6888-4e24-b237-c6296cb7d6d7',
  },
  {
    id: '4bfb61be-29c1-42eb-b00a-b048c1b9d582',
    text: 'Mongoose library.',
    author: '78323e9d-d049-403c-a970-c995ded430e7',
    post: 'beb073f2-6888-4e24-b237-c6296cb7d6d7',
  },
  {
    id: '891',
    text: 'Mongo DB challenge.',
    author: '78323e9d-d049-403c-a970-c995ded430e7',
    post: '2',
  },
  {
    id: '6982',
    text: 'Redux router and everybody.',
    author: '2',
    post: '3',
  },
];

const db = {
  users,
  posts,
  comments,
};

export { db as default };
