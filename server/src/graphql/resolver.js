const {createUser,loginUser,getDataUser, updateAvatarC,deleteAvatarI,UpdateUser, searchUsers} = require('../controllers/user');

const resolvers = {

  Query:{
    login:(_,{input})=>loginUser(input),
    getUser:(_,{username})=>getDataUser(username),
    search:(_,{search},ctx)=>searchUsers(search,ctx)
  },
  Mutation:{
    // User
    register:async(_,{input})=>createUser(input),
    updateAvatar:async(_,{file},ctx)=>updateAvatarC(file,ctx),
    deleteAvatar:async(_,__,ctx)=>deleteAvatarI(ctx),
    updateUser:async(_,{input},ctx)=>UpdateUser(input,ctx)
  }
}
module.exports =   resolvers;
