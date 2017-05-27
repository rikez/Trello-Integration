
module.exports = (sequelize, dataTypes) =>  {
    const User = sequelize.define('user', {
    name: {
        type: dataTypes.STRING(255),
        allowNull:false
    },
    email: {
        type: dataTypes.STRING(100),
        allowNull:false,
        unique:true,
        validate: {
            isEmail: true
        }
    },
    dob: {
        type: dataTypes.DATE,
        validate: {
            isDate: true
        }
    }
})

    return User;
}
