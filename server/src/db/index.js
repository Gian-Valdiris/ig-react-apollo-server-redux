const mongooose = require('mongoose');
const consola = require('consola')


async function connectDb(){
  
  try {
    await mongooose.connect(process.env.MONGO);
    consola.success('connected db 🚀') 
  }
  catch ({message}) {
    throw new Error('sorry can not connect db')
  }
};
module.exports = connectDb;