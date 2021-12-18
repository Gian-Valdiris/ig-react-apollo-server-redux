const ModelUser = require('../db/models/User');
const bcryptjs = require('bcryptjs') 
const fs = require('fs');
// const {awsUploadImage} = require('../../utils/aws-upload-image');
const {awsUploadImage} = require('../utils/aws-upload-image');
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
async function getDataUser(username){

  // buscar por username e igual buscar por id 
  const user = await ModelUser.findOne({username})
  if (!user){
    const userbyId = await ModelUser.findById(username);
    if (!userbyId){
      throw new Error('No se encontro el usuario')
    }
    return userbyId
  }
  return user;
}


async function updateAvatarC({file},ctx){
  
  if( !ctx.user){
    throw new Error('!token')
  }

  const idUser=ctx.user.id;
  const {createReadStream,mimetype} = await file;
  const path = `avatar/${idUser}.${mimetype.split('/')[1]}`;
  const fileData = createReadStream();

  try{
    const result = await awsUploadImage(fileData,path)
    await ModelUser.findByIdAndUpdate(idUser,{
      avatar:result
    })
    return {
      status:true,
      urlAvatar:result
    }
  }
  catch({message:error}){
    console.log({error})
    throw new Error(error) 
  }
}

async function deleteAvatarI(ctx){
  if(!ctx.user){
    throw new Error('!token')
  }
  const {id} = ctx.user;

  try{
    await ModelUser.findByIdAndUpdate(id,{avatar:null});
    console.log(id)
    return true;
  }
  catch({message}){
    throw new Error(message)
  }
}

async function UpdateUser(input,ctx){
  if (!ctx.user){
    throw new Error('No hay un usuario logeado')
  }
  const {id} = ctx.user;
  const {currentPassword,newPassword} = input;
  // Vemos si viene la clave
  if (currentPassword){
    console.log({...input});
    const user = await ModelUser.findById(id);
    // verificar si las claves son iguales
    const eqPass = await  bcryptjs.compareSync(currentPassword,user.password)
    if (eqPass){
      // canbiar la contraseña
      const saltos =  bcryptjs.genSaltSync(10);
      const newHaskPass = bcryptjs.hashSync(newPassword,saltos);
      await ModelUser.findByIdAndUpdate(id,{
        ...input,
        password:newHaskPass
      })
      return true;
    }
    else{
      throw new Error('La contraseña no es valida')
    }
  }
  else{
    const {password,...newData} = input;
    const userUpdated = await ModelUser.findByIdAndUpdate(id,newData)
    return true
  }
};

async function searchUsers(search,ctx){
  if(!ctx.user){
    throw new Error('falta token')
  }
  try{
    const users = await ModelUser.find({
      name:{$regex:search,$options:'i'}
    })
    return users;
  }
  catch({message}){
    throw new Error(message)
  }

}

module.exports={
  createUser,
  loginUser,
  getDataUser,
  updateAvatarC,
  deleteAvatarI,
  UpdateUser,
  searchUsers
}