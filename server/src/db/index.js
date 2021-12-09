const mongooose = require('mongoose');
const consola = require('consola')

async function connectDb(){
  try {
    // NOTA: Con la ultima actualizacion de mongo, solo se le pasa la Uri de mongo y listo
    await mongooose.connect(process.env.MONGO)
    consola.success('connected db 🚀') 
  }
  catch ({message}) {
    throw new Error('sorry can not connect db')
  }
};
module.exports = connectDb;