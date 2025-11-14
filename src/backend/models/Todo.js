import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Title tidak boleh kosong" }
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});