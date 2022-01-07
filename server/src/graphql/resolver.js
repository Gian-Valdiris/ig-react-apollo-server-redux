const  { PubSub,withFilter } = require('graphql-subscriptions');
const ModelUser = require('../db/models/User')
const ModelFollow=require('../db/models/Follow')
const pubsub = new PubSub();


const {
  createUser,
  loginUser,
  getDataUser,
  updateAvatarC,
  deleteAvatarI,
  UpdateUser,
  searchUsers
} = require('../controllers/user');

const {
  followController,
  isFollowController,
  unFollowController,
  followersController,
  followedControllers

}= require('../controllers/follow');

const {publisController,getPublicationsControllers} = require('../controllers/Publication');


const resolvers = {
    Query:{    
    login:(_,{input})=>loginUser(input),
    getUser:(_,{username})=>getDataUser(username),
    search:(_,{search},ctx)=>searchUsers(search,ctx),
    // FOLLOW
    isFollow:(_,{username},ctx)=>isFollowController(username,ctx),
    followers:(_,{username},ctx)=>followersController(username,ctx),
    followed:(_,{username},ctx)=>followedControllers(username,ctx),
    // PUBLICATIONS
    getPublications:(_,{username},ctx)=>getPublicationsControllers(username,ctx)
  },
  Mutation:{
    // User
    register:async(_,{input})=>createUser(input),
    updateAvatar:async(_,{file},ctx)=>updateAvatarC(file,ctx),
    deleteAvatar:async(_,__,ctx)=>deleteAvatarI(ctx),
    updateUser:async(_,{input},ctx)=>UpdateUser(input,ctx),
    // FOLLLOWR 
    // follow:async(_,{username},ctx)=>followController(username,ctx),
    follow:async(_,{username},ctx)=>{
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
        
        const followers = (await ModelFollow.find({
          follow:userFound.id
        }).populate('idUser')).map(i=>(i.idUser))
        console.log(followers)
        pubsub.publish('FOLLOWERS',{followers:{
          username,
          followers:followers
        }})
        return true;
      } 
      catch({message:error}){
        return false;
      }
    },
    unFollow:async(_,{username},ctx)=>unFollowController(username,ctx), 
    //PUBLICATION
    publish:async(_,{file},ctx)=>publisController(file,ctx)
  },

  Subscription:{
    followers:{
      subscribe:withFilter(
        ()=>pubsub.asyncIterator(['FOLLOWERS']),
        (payload,variables)=>{
          console.log(payload)
          return payload.followers.username===variables.username
        }
      )
    }
  }
  
}
module.exports =   {
  resolvers,
  pubsub
};
