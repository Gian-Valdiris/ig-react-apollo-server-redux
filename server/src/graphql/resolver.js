const {createUser,loginUser} = require('../controllers/user');
const resolvers = {

  Query:{
    login:(_,{input})=>loginUser(input)
  },
  Mutation:{
    // User
    register:async(_,{input})=>createUser(input)

  }
}
module.exports =   resolvers;
