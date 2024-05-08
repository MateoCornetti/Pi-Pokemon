const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type:DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type:DataTypes.STRING,
    },
    hp: {
      type:DataTypes.STRING,
    },
    attack: {
      type:DataTypes.STRING,
    },
    defense: {
      type:DataTypes.STRING,
    },
    speed: {
      type:DataTypes.STRING,
    },
    height: {
      type:DataTypes.STRING,
    },
    weight: {
      type:DataTypes.STRING,
    },

  }, {timestamps: false});
};
