const jwt = require('jsonwebtoken');
const  { configAuth } = require('../config/config');

const verifyToken=(req, res, next) =>{

  if (!req.header('Authorization')) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
  }
  const token = req.header('Authorization').split(' ')[1];
  try {
    const decoded = jwt.verify(token, configAuth.secret); 
    req.user = decoded.user[0];
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token no válido.' });
  }
}

const verifyPermission =  (rolesAllowed)=> {
  
  return (req, res, next) => {
    const userRoleId = req.user ? req.user.UserRole.id : null;
    const userRole = req.user ? req.user.UserRole.description : null;
    if (!userRoleId) {
      return res.status(401).json({ mensaje: 'Acceso denegado. user con roll no identificado.' });
    }
    
    if (!rolesAllowed.includes(userRole)) {
      return res.status(403).json({ message: "Acceso prohibido. No tiene permiso para acceder a esta ruta." });
    }
    next();
};
  
}

module.exports={
  verifyToken, verifyPermission
};