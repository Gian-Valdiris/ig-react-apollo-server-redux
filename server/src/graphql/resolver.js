const {createUser,loginUser,getDataUser, updateAvatarC} = require('../controllers/user');

const resolvers = {

  Query:{
    login:(_,{input})=>loginUser(input),
    getUser:(_,{username})=>getDataUser(username)
  },
  Mutation:{
    // User
    register:async(_,{input})=>createUser(input),
    updateAvatar:async(_,{file})=>updateAvatarC(file)

  }
}
module.exports =   resolvers;
