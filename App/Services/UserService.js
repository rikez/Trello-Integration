const jwt = require('jsonwebtoken');

module.exports = (app) => {
    let connectionFactory = new app.App.Services.ConnectionFactory();

    function UserService() {

        this.generateToken = (user) => {
            try {
                let stringData = JSON.stringify({id: user.id, name: user.name});
                let token = jwt.sign({token: stringData}, process.env.AUTH_TOKEN_SECRET);
                return token;
            } catch (e) {
                throw new Error(e);
            }
        }

        this.save = (user) => {
            return connectionFactory.db.userEntity.create(user).then(userCreated => {
                let token = this.generateToken(userCreated);
                return connectionFactory.db.tokenEntity.create({
                    userId: userCreated.id,
                    token: token
                });
            }).then(tokenCreated => {
                return tokenCreated;
            }).catch(err => {
                return err;
            })
        }
    }

    return UserService;
}
