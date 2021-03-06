const userRouter = require('./user');
const postRouter = require('./post');
const postsRouter = require('./posts');
const hashtagRouter = require('./hashtag');

module.exports = app => {
  app.use('/api/user', userRouter);
  app.use('/api/post', postRouter);
  app.use('/api/posts', postsRouter);
  app.use('/api/hashtag', hashtagRouter);
};
