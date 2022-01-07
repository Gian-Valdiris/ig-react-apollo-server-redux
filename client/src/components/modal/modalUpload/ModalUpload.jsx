

import {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';


import {Button, Icon, Modal,Dimmer,Loader,Segment} from 'semantic-ui-react';
import {toast} from 'react-toastify';
import {useMutation} from '@apollo/client';
import {PUBLISH} from '../../../graphql/Mutations';
import './ModalUpload.scss';


export default function ModalUpload({showModal,setShowModal}){


  const [fileUpload, setfileUpload] = useState(null)

  const [publishMutation,{loading}] = useMutation(PUBLISH,{
    onCompleted(data){
      setfileUpload(null)
      setShowModal(false)
      toast.success('Se creo la publicacion')
  
    },
    onError(e){
      toast.error(e)
    }
  })

  // eslint-disable-next-line 
  const onDrop = useCallback(({0:file})=>{
    setfileUpload({
      type:'image',
      file,
      preview:URL.createObjectURL(file)
    })
  })

  const handlePublish = ()=>{
    console.log(fileUpload)
    console.log('Publicando')
    publishMutation({
      variables:{
        file:fileUpload.file
      }
    })
  }

  const {getInputProps,getRootProps} = useDropzone({
    accept:'image/jpeg, image/png',
    noKeyboard:true,
    multiple:false,
    onDrop
  })

  return (
    <Modal open={showModal} onClose={()=>setShowModal(false)} size='small' className='modal-upload'>
   
      <div {...getRootProps()} className='drop-zone' style={fileUpload && {border:'none'} }>
        <div>
        {
          !fileUpload && (
            <>
            <Icon name = 'cloud upload' />
            <p>Arrastra tu imagen que quieras publicar</p>
            </>
          )
        }
        </div>
      <input {...getInputProps()}/>
      {
        fileUpload && (
          <>
          <img src={fileUpload.preview} alt='https://cdn.memegenerator.es/imagenes/memes/thumb/21/43/21438038.jpg'  style={{width:'100%',height:'100%',objectFit:'contain'}} />
          </>
        )
      }
      </div>
      {
        fileUpload && (
          <>
          <Button   className='btn-submit btn-publish' onClick={handlePublish}>
            Publicar
          </Button>
          </>
           
        )
      }
      {
        loading  && (
        <Dimmer active >
          <Loader />
          <p>
            Subiendo publicacion
          </p>
        </Dimmer>
        )
      }
    </Modal>
  ) 

};