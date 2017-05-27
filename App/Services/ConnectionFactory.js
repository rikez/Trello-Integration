const Sequelize = require('sequelize');

function Connection() {
    this.connection = new Sequelize(
        process.env.DB_NAME, 
        process.env.DB_USER,
        process.env.DB_PASS, {
            dialect: process.env.DB_DIALECT,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 3306,
            freezeTableName: true,
            timestamps:true
        });
    this.db = {
        userEntity: this.connection.import("../Entity/UserEntity.js"),
        tokenEntity: this.connection.import("../Entity/TokenEntity.js")
    }

    this.db.userEntity.hasOne(this.db.tokenEntity);
    this.db.tokenEntity.belongsTo(this.db.userEntity);

    this.sequelize = Sequelize;
}

function createConnection() {
    return new Connection();
}


module.exports = function() {
    return createConnection;
}

