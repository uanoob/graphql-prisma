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
};

export { Mutation as default };
