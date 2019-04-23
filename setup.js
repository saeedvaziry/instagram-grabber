const Page = require('./models/Page');
const Post = require('./models/Post');

Page.sync({ force: true }).then(() => {
  return Page.create({
    username: 'khandelaneh'
  });
});

Post.sync({ force: true }).then(() => {
  return Post.create({
    pk: 0,
    type: 'none'
  });
});