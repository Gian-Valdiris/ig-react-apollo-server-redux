import './AvatarFrom.scss';

import {useCallback} from 'react';
import {toast} from 'react-toastify';
import {useDropzone} from 'react-dropzone';
import {Button} from 'semantic-ui-react';
import {useMutation} from '@apollo/client';

import {DELETE_AVATAR, UPDATE_AVATAR} from '../../graphql/Mutations'

function AvatarFrom({setShowModal}) { 

  const [updateAvatar,{loading}] = useMutation(UPDATE_AVATAR,{
    onCompleted(data){
      setShowModal(false)
      toast.success('Se actualizo la foto')
    },
    onError({message}){
      if (message === '!token'){
        localStorage.removeItem('persist:root')
        window.location.pathname='/'
      }
      toast.error('No se pudo subir la foto')
    }
  });

  const [deleteAvatar,{loading:loadingDelete}]= useMutation(DELETE_AVATAR,{
    onCompleted(data){
      console.log(data)
    },
    onError({message}){
      if (message === '!token'){
        window.location.pathname='/';
        localStorage.removeItem('persist:root')
      }
    }
  })
  const onDrop= useCallback((files)=>{
      updateAvatar({variables:{
        file:files[0]
      }})
      
    //eslint-disable-next-line
  },[])

  const {getInputProps,getRootProps} = useDropzone({
    accept:'image/*',
    noKeyboard:true,
    multiple:false,
    onDrop:onDrop
  })

  return (

    <div className="avatar-form">
    
      <Button {...getRootProps()} loading={loading}>
        Cargar una foto
      </Button>
    
      <Button loading={loadingDelete} onClick={()=>deleteAvatar()}>
        ELiminar foto actual
      </Button>
    
      <Button onClick={()=>setShowModal(false)}>
        Cancelar
      </Button>
    
      <input {...getInputProps()} /> 
    
    </div>
  )
}

export default AvatarFrom
