const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING(3),
      primaryKey: true,
      autoIncrement: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameCommon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
    },
    subregion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.STRING,
    },
    population: {
      type: DataTypes.FLOAT,
    }
  }, {
    timestamps: false,
  });
};
