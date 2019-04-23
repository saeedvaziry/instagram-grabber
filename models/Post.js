const Sequelize = require('sequelize');
const sequelize = require('../db');

const Post = sequelize.define('post', {
  pk: {
    type: Sequelize.BIGINT,
    allowNull: false,
    unique: true
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {});

module.exports = Post;