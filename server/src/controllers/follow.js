
const ModelFollow = require('../db/models/Follow');
const ModelUser = require('../db/models/User');
const {pubsub} = require('../graphql/resolver');

const followController=async (username,ctx)=>{

  const userFound = await ModelUser.findOne({username})
  if (!userFound){
    throw new Error('No se encuentra dicho usuario')
  }
  if( !ctx.user){
    throw new Error('No hay token valido')
  }
  /* En este caso el usuario autenticado,el que viene en el 
    context quiere seguir a el usuario de username,
    entonces hacer que la subscripcion e informarle al username
    que tiene mas seguidores
    quiere decir que usernameGano un seguidor mas
  */
  try{
    const follow = new ModelFollow({
      idUser:ctx.user.id,
      follow:userFound.id,
    })
    await follow.save();
    //SACAR LA NUEVA CANTIDAD DE SEGUIDORES DE USERNAME
    const followers = await ModelFollow.find({
      follow:userFound.id
    })
    pubsub.publish('FOLLOWERS',{followers:{
      username,
      followers:followers.length
    }})
    return true;
  }
  catch({message:error}){
    return false;
  }
}
const isFollowController=async(username,ctx)=>{
  
  if (!ctx.user){
    throw new Error('No autenticado');
  }
  const userFound = await ModelUser.findOne({username})
  if (!userFound) throw new Error('No se encuentra el usuario');

  try{
    const follow = (await ModelFollow.find({idUser:ctx.user.id}).where('follow').equals(userFound.id));
    if (follow.length>0){
      return true;
    }
    return false
  }
  catch(e){
    throw new Error('Error....')
  }

}

const unFollowController= async(username,ctx)=>{
  
  const userFound = await ModelUser.findOne({username});
  const follow = await ModelFollow.deleteOne({idUser:ctx.user.id}).where('follow').equals(userFound.id);
  console.log(follow)
  if (follow.deletedCount>0){
    return true;
  }
  else{
    return false;
  }
}
const followersController= async(username,ctx)=>{
  const user= await ModelUser.findOne({username});
  const followers =(await ModelFollow.find({follow:user.id}).populate('idUser')).map(i=>(i.idUser));
  return followers;
}

const followedControllers = async(username,ctx)=>{

  const user = await ModelUser.findOne({username})
  if (!user){
    throw new Error ('No hay un usuario');
  }
  const followed = (await ModelFollow.find({idUser:user.id}).populate('follow')).map(i=>(i.follow))
  return followed;
};

module.exports = {
  followController,
  isFollowController,
  unFollowController,
  followersController,
  followedControllers
};
