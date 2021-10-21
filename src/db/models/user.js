'use strict';
const bcrypt = require('bcrypt');
const HASH_ROUND = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      underscored: true,
      hooks: {
        beforeCreate(user, options) {
          user.password = bcrypt.hashSync(user.password, HASH_ROUND);
        },
      },
    }
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
