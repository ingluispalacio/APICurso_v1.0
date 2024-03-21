const jwt = require('jsonwebtoken');
const  { configAuth } = require('../config/config');

const expires=configAuth.expires;

const generateToken = (user) => {
    try {
        const payload = {
            user: user
        };

        const token = jwt.sign(payload, configAuth.secret, { expiresIn: expires });

        return token;
    } catch (error) {
        throw error;
    }
}

module.exports={
    generateToken, expires
};
