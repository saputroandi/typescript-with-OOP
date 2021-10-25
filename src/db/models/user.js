'use strict';
const bcrypt = require('bcrypt');
const { ValidationError } = require('sequelize');
const HASH_ROUND = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          async isUnique(email) {
            const userMail = await User.findOne({ where: { email } });
            if (userMail) {
              throw new ValidationError('email has been taken');
            }
          },
        },
      },
      role: {
        type: DataTypes.ENUM(['user', 'admin']),
        defaultValue: 'user',
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: [6, 255],
        },
      },
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
