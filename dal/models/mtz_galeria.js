'use strict';
module.exports = (sequelize, DataTypes) => {
    const mtz_galeria = sequelize.define('mtz_galeria', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        nombre: DataTypes.STRING,
        id_anuncio: DataTypes.INTEGER,
        activo: DataTypes.INTEGER
    }, {
        //Evita las columnas updatedAt sequelize
        //Evita la pluralizacion del nombre de las tablas
        timestamps: false,
        freezeTableName: true
    }, {});
    mtz_galeria.associate = function(models) {
        // associations can be defined here
    };
    return mtz_galeria;
};