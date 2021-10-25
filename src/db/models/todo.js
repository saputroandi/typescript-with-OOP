'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define(
    'todo',
    {
      user_id: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      underscored: true,
    }
  );
  todo.associate = function (models) {
    // associations can be defined here
    todo.belongsTo(models.User);
  };
  return todo;
};
