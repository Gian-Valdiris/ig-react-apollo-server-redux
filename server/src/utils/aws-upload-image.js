const AWS = require('aws-sdk');
const {PUBLIC_ID,SECRET_ID,REGION,BUCKET} = process.env;

const S3 = new AWS.S3({
  accessKeyId:PUBLIC_ID,
  secretAccessKey:SECRET_ID
})


const awsUploadImage=async(file,pathFile)=>{

  const params ={
    Bucket:BUCKET,
    Key:`${pathFile}`,
    Body:file
  }
  try{
    const {Location} = await S3.upload(params).promise();
    return Location;
  }
  catch({message:error}){
    console.log({error})
  }


}

module.exports={
  awsUploadImage
}