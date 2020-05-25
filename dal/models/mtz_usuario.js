'use strict';
module.exports = (sequelize, DataTypes) => {
    const mtz_usuario = sequelize.define('mtz_usuario', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        usuario: DataTypes.STRING,
        password: DataTypes.STRING,
        nombre: DataTypes.STRING,
        activo: DataTypes.INTEGER,
        email: DataTypes.STRING,
        foto: DataTypes.STRING,
        social: DataTypes.STRING
    }, {
        //Evita las columnas updatedAt sequelize
        //Evita la pluralizacion del nombre de las tablas
        timestamps: false,
        freezeTableName: true
    }, {});
    mtz_usuario.associate = function(models) {
        mtz_usuario.belongsToMany(models.mtz_rol, {
            through: "mtz_usuario_rol",
            as: "authorities",
            foreignKey: "id_usuario"
        });
    };
    return mtz_usuario;
};