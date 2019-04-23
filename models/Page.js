const Sequelize = require('sequelize');
const sequelize = require('../db');

const Page = sequelize.define('page', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cursor: {
    type: Sequelize.STRING,
    allowNull: true
  },
  last: {
    type: Sequelize.BIGINT,
    allowNull: true
  },
}, {});

module.exports = Page;