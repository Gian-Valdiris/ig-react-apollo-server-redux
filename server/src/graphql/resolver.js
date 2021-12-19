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
  unFollowController

}= require('../controllers/follow');

const resolvers = {
    Query:{    
    login:(_,{input})=>loginUser(input),
    getUser:(_,{username})=>getDataUser(username),
    search:(_,{search},ctx)=>searchUsers(search,ctx),
    // FOLLOW
    isFollow:(_,{username},ctx)=>isFollowController(username,ctx)
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
  }
}
module.exports =   resolvers;
