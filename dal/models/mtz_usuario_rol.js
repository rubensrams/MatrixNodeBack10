'use strict';
module.exports = (sequelize, DataTypes) => {
    const mtz_usuario_rol = sequelize.define('mtz_usuario_rol', {
        id_usuario: DataTypes.INTEGER,
        id_rol: DataTypes.INTEGER
    }, {
        //Evita las columnas updatedAt sequelize
        //Evita la pluralizacion del nombre de las tablas
        timestamps: false,
        freezeTableName: true
    }, {});
    mtz_usuario_rol.associate = function(models) {
        // associations can be defined here
    };
    return mtz_usuario_rol;
};