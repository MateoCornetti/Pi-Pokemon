const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Type', {
    id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      autoIncrement: true,
      primaryKey:true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {timestamps: false});
};