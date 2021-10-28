const ModelUser = require('../db/models/User');
const bcryptjs = require('bcryptjs') 
const {createToken} = require('../helpers/createToken');

async function createUser(input){
  input.email=input.email.toLowerCase();
  input.username=input.username.toLowerCase();
  const {email,username} = input;
  let foundUsername = await ModelUser.findOne({username});
  let foundMail = await ModelUser.findOne({email});
  if(foundUsername){
    throw new Error('El nombre de usuario ya esta registrado')
  }
  if(foundMail){
    throw new Error('El Email del usuario ya esta registrado')
  }
  // Encriptar contraseña
  input.password= await bcryptjs.hashSync(input.password,bcryptjs.genSaltSync());
  // registrar el usuario 
  const user = new  ModelUser(input);
  await user.save();
  return user
}

async function loginUser({email,password}){
  // ver si hay un usario con ese email
  const User= await ModelUser.findOne({email});
  if(!User){
    throw new Error('email or password incorrect');
  }
  else{
    //Verificar las contraseñas ver si hacen hash
    const correctPassword = bcryptjs.compareSync(password,User.password)
    if(!correctPassword){
      throw new Error ('email or password incorrect')
    }
    const payload = {
      email,
      username:User.username,
      name:User.name,
      id:User.id
    }
    const token = createToken(payload,process.env.SECRET_KEY,'24h');
    return {token}
  }
} 

module.exports={
  createUser,
  loginUser
}