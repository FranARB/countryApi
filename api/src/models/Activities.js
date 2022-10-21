const {DataTypes} = require('sequelize');

    //export a function, conection injected to sequelize

module.exports = sequelize=>{
    sequelize.define('Activities',{
            //model definition
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficult:{
            type: DataTypes.STRING,
        },
        duration:{
            type: DataTypes.INTEGER,
        },
        season: {
            type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera')
        },

    },{
        //
        timestamps: false,
    })
}