'use strict';
module.exports = (sequelize, DataTypes) => {
    const mtz_anuncio = sequelize.define('mtz_anuncio', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        titulo: DataTypes.STRING,
        fecha: DataTypes.STRING,
        activo: DataTypes.INTEGER,
        precio: DataTypes.DOUBLE,
        preview: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        id_usuario: DataTypes.INTEGER,
        id_estado: DataTypes.INTEGER,
        id_categoria: DataTypes.INTEGER
    }, {
        //Evita las columnas updatedAt sequelize
        //Evita la pluralizacion del nombre de las tablas
        timestamps: false,
        freezeTableName: true
    }, {});
    mtz_anuncio.associate = function(models) {
        // associations can be defined here
    };
    return mtz_anuncio;
};