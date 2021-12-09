
const jwt = require('jsonwebtoken');


async function createToken(payload,secretKey,duration){
  
  try{
    const token = jwt.sign(payload,secretKey,{expiresIn:duration});
    return token;
  }
  catch(e){
    throw new Error ('Error al generar el JWT')
  }
}
module.exports = {
  createToken
};
