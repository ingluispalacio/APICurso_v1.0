const UserService = require('../services/User.service');
const service = new UserService();
const { generateToken, expires } = require('../helpers/token.helper');
const { currentDateTime, calculateExpirationDate } = require('../helpers/operations.herlper');
const { compare } = require('bcryptjs');


const login = async ( req, res ) => {
    try {
        const { email, password } = req.body;
        const user = await service.findByEmail( email );
        if (!user) {
            res.status(404).send({ success: false, message: "Credenciales Incorrectas. Verifique su usuario" })
        } 
        
        if (Array.isArray(user)&&user.length>0) {
            const verificarPasword=await compare( password, user[0].password);
            if (!verificarPasword) {
                res.status(401).send({ success: false, message: "Credenciales Incorrectas. Verifique su password" });
            }else{
                const token= generateToken( user );
                res.json({ success: true, message: 'Inicio de sesión exitoso', token:token, fecha_creacion: currentDateTime, expira: calculateExpirationDate(expires), user: user[0]});
            }
        } else {
            res.status(401).json({ success: false, message: 'Credenciales incorrectas. Verifique su usuario y contraseña.' });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = {
    login
};