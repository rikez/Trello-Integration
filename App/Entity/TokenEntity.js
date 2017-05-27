
module.exports = (sequelize, dataTypes) => {
    const Token = sequelize.define('api_token', {
        token: {
            type: dataTypes.STRING(255),
            allowNull:false
        },
})

    return Token;
}
