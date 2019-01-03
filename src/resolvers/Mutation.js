import uuid from 'uuid/v4';

const Mutation = {
  createUser(parent, args, { db }) {
    const { name, email, age } = args.data;
    const emailTaken = db.users.some(user => user.email === email);
    if (emailTaken) {
      throw new Error('Email is exist');
    }
    const user = {
      id: uuid(),
      name,
      email,
      age,
    };
    db.users.push(user);
    return user;
  },
  deleteUser(parent, args, { db }) {
    const userIndex = db.users.findIndex(user => user.id === args.id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const deletedUsers = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter((post) => {
      const match = post.author === args.id;
      if (match) {
        db.comments = db.comments.filter(comment => comment.post !== post.id);
      }
      return !match;
    });
    db.comments = db.comments.filter(comment => comment.author !== args.id);
    return deletedUsers[0];
  },
  updateUser(parent, args, { db }) {
    const { id, data } = args;
    const user = db.users.find(item => item.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    if (typeof data.email === 'string') {
      const emailTaken = db.users.some(item => item.email === data.email);
      if (emailTaken) {
        throw new Error('Email already exist');
      }
      user.email = data.email;
    }
    if (typeof data.name === 'string') {
      user.name = data.name;
    }
    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }
    return user;
  },
  createPost(parent, args, { db }) {
    const {
      title, body, published, author,
    } = args.data;
    const userExist = db.users.some(user => user.id === author);
    if (!userExist) {
      throw new Error('User not found');
    }
    const post = {
      id: uuid(),
      title,
      body,
      published,
      author,
    };
    db.posts.push(post);
    return post;
  },
  deletePost(parent, args, { db }) {
    const postIndex = db.posts.findIndex(post => post.id === args.id);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }
    const deletedPosts = db.posts.splice(postIndex, 1);
    db.comments = db.comments.filter(comment => comment.post !== args.id);
    return deletedPosts[0];
  },
  updatePost(parent, args, { db }, info) {
    const { id, data } = args;
    const post = db.posts.find(item => item.id === id);
    if (!post) {
      throw new Error('Post not found');
    }
    if (typeof data.title === 'string') {
      post.title = data.title;
    }
    if (typeof data.body === 'string') {
      post.body = data.body;
    }
    if (typeof data.published === 'boolean') {
      post.published = data.published;
    }
    return post;
  },
  createComment(parent, args, { db }) {
    const { text, author, post } = args.data;
    const userExist = db.users.some(user => user.id === author);
    if (!userExist) {
      throw new Error('User not found');
    }
    const postExist = db.posts.some(item => item.id === post && item.published);
    if (!postExist) {
      throw new Error('Post not exist or not published');
    }
    const comment = {
      id: uuid(),
      text,
      author,
      post,
    };
    db.comments.push(comment);
    return comment;
  },
  deleteComment(parent, args, { db }) {
    const commentIndex = db.comments.findIndex(comment => comment.id === args.id);
    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }
    const deletedComments = db.comments.splice(commentIndex, 1);
    return deletedComments[0];
  },
  updateComment(parent, args, { db }, info) {
    const { id, data } = args;
    const comment = db.comments.find(item => item.id === id);
    if (!comment) {
      throw new Error('Comment not found');
    }
    if (typeof data.text === 'string') {
      comment.text = data.text;
    }
    return comment;
  },
};

export { Mutation as default };
