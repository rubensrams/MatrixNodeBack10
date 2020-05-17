'use strict';
module.exports = (sequelize, DataTypes) => {
    const mtz_rol = sequelize.define('mtz_rol', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        nombre: DataTypes.STRING,
        activo: DataTypes.INTEGER
    }, {
        //Evita las columnas updatedAt sequelize
        //Evita la pluralizacion del nombre de las tablas
        timestamps: false,
        freezeTableName: true
    }, {});
    mtz_rol.associate = function(models) {
        mtz_rol.belongsToMany(models.mtz_usuario, {
            through: "mtz_usuario_rol",
            as: "usuarios",
            foreignKey: "id_rol"
        });
    };
    return mtz_rol;
};