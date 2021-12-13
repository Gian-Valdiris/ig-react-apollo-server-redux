const {createUser,loginUser,getDataUser, updateAvatarC,deleteAvatarI} = require('../controllers/user');

const resolvers = {

  Query:{
    login:(_,{input})=>loginUser(input),
    getUser:(_,{username})=>getDataUser(username)
  },
  Mutation:{
    // User
    register:async(_,{input})=>createUser(input),
    updateAvatar:async(_,{file},ctx)=>updateAvatarC(file,ctx),
    deleteAvatar:async(_,__,ctx)=>deleteAvatarI(ctx)
  }
}
module.exports =   resolvers;
