const  { PubSub,withFilter } = require('graphql-subscriptions');
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
  followersController

}= require('../controllers/follow');


const resolvers = {
    Query:{    
    login:(_,{input})=>loginUser(input),
    getUser:(_,{username})=>getDataUser(username),
    search:(_,{search},ctx)=>searchUsers(search,ctx),
    // FOLLOW
    isFollow:(_,{username},ctx)=>isFollowController(username,ctx),
    followers:(_,{username},ctx)=>followersController(username,ctx)
  },
  Mutation:{
    // User
    register:async(_,{input})=>createUser(input),
    updateAvatar:async(_,{file},ctx)=>updateAvatarC(file,ctx),
    deleteAvatar:async(_,__,ctx)=>deleteAvatarI(ctx),
    updateUser:async(_,{input},ctx)=>UpdateUser(input,ctx),
    // FOLLLOWR 
    follow:async(_,{username},ctx)=>followController(username,ctx),
    unFollow:async(_,{username},ctx)=>unFollowController(username,ctx), 
    crearPost(_,{name}){
      console.log(name)
      pubsub.publish("NAME", { postCreated: name });
      return true;
    }   
  },

  Subscription:{
    postCreated:{
      subscribe:withFilter(
        () => pubsub.asyncIterator(["NAME"]),
        (payload,variables)=>{
          console.log(payload)
          return payload.postCreated===variables.name
        }
      )
    }
  }
  
}
module.exports =   resolvers;
