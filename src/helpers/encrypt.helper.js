const bcrypt = require('bcryptjs');
const  { configAuth } = require('../config/config');


const encrypt = async (password) => {
    try {
        const salt=parseInt(configAuth.rounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw error;
    }
};

const compare = async (password, passwordUser) => {
    return await bcrypt.compare(password, passwordUser); 
};

module.exports = {
    encrypt, compare
};


