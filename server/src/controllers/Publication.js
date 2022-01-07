const {v4:uuid} = require('uuid');
const PublicationModel = require('../db/models/Publication');
const ModelUser  = require('../db/models/User');
const {awsUploadImage} = require('../utils/aws-upload-image')

const publish=async(file,ctx,pubsub)=>{
  // ASI PORQUE LLEGA COMO UNA PROMESA FILE.FILE
  const {mimetype,createReadStream}  =  file.file;
  const typeFile = mimetype.split('/')[1]
  const fileName=`publication/${uuid()}.${typeFile}`
  const fileData = createReadStream();

  try{
    const result = await awsUploadImage(fileData,fileName);
    // guardar en la base de datos 
    const publication = new PublicationModel({
      idUser:ctx.user.id,
      file:result,
      typeFile,
    })
    await publication.save();
    // comno se creo una nueva publicacion,entonces toca mandar las publicaciones
    try{  
      // sacar las publicaciones
      const public= await getPublicationsControllers(ctx?.user?.username,ctx);
      pubsub.publish('PUBLICATIONS',{
        publications:{
          username:ctx?.user?.username,
          publicaciones:public
        }
      })
    }
    catch(e){
      console.log(e);
    }
    return {
      status:true,
      urlFile:result
    }
  }
  catch({message}){
    throw new Error('No se creo la publicacion')
  }
}

const getPublicationsControllers = async(username,ctx)=>{
  // Buscar el usuario
  try{
    const user = await ModelUser.findOne({username})
    const publicaciones = await PublicationModel.find({idUser:user.id});
    // Buscar  las publicaciones de ese usuario
    return publicaciones
  }
  catch(e){
    throw new Error('No se encontro el usuario')
  }
}



module.exports = {
  publisController:publish,
  getPublicationsControllers
};
