module.exports = (sequelize, DataType) => {
    return sequelize.define('mtz_usuario', {
        id: {
            type: DataType.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        usuario: DataType.STRING(80),
        password: DataType.STRING(100),
        nombre: DataType.STRING(100),
        activo: DataType.INTEGER(1),
        email: DataType.STRING(80),
        foto: DataType.STRING(100),
        google: DataType.INTEGER(1)

    }, {
        //Evita las columnas updatedAt sequelize
        //Evita la pluralizacion del nombre de las tablas
        timestamps: false,
        freezeTableName: true
    });

};