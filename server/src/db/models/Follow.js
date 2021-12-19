const {Schema,model} = require('mongoose');

const Followers = new  Schema({
  // El usuario que sige 
  idUser:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'User'
  },
  // A este usuaario
  follow:{
    type:Schema.Types.ObjectId,
    require:true,
    ref:'User'
  },
  createAt:{
    type:Date,
    default:Date.now()
  }
})
module.exports = model('Follow',Followers);