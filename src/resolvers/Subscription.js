const Subscription = {
  post: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator('post');
    },
  },
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const postToSubscribe = db.posts.find(post => post.id === postId && post.published);
      if (!postToSubscribe) {
        throw new Error('Post not found');
      }
      return pubsub.asyncIterator(`comment ${postId}`);
    },
  },
};

export { Subscription as default };
