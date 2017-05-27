
module.exports = (app) => {

    let JWT = new app.App.Core.JWTPromisified.JWTPromisify();
    let connectionFactory = new app.App.Services.ConnectionFactory();

    function AuthMiddleware() {
        this.token = null;

        this.apiAuthentication = (req, res, next) => {
            this.token = req.query.token;
            if(this.token) {
                connectionFactory.db.tokenEntity.findOne({
                            where: {
                                token: this.token
                            }
                }).then(tokenExist => {
                    if(tokenExist) {
                        return JWT.verify(this.token)
                    } 
                }).then(tokenDecoded => {
                    if(tokenDecoded) {
                        req.user = tokenDecoded;
                        next();
                    } else {
                        res.status(401).send({
                            failure : "You are not authorized to proceed.", 
                            error: "Token is invalid.",
                            expired: "Token was not found in database"
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    res.status(401).send({
                        failure : "You are not authorized to proceed.", 
                        error: "Token is invalid.",
                        errorStack: error
                    });
                })
            } else {
                res.status(401).send({
                    failure : "You are not authorized to proceed.", 
                    error: "Token was not provided."
                });
            }
        }

    }

    return AuthMiddleware;

}