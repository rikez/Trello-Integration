let JWT = require('jsonwebtoken');

function JWTPromisify() {
    this.verify = (token) => {
        return new Promise((resolve, reject) => {
            JWT.verify(token, process.env.AUTH_TOKEN_SECRET, (error, tokenDecoded) => {
                if(error) {
                    reject(error);   
                }
                resolve(tokenDecoded);
            })
        });
    }
}

module.exports = {
    JWTPromisify
}