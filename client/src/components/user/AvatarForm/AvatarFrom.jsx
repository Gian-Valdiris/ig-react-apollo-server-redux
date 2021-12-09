import './AvatarFrom.scss';
import {useMutation} from '@apollo/client';
import {UPDATE_AVATAR} from '../../../graphql/Mutations'
import {Button} from 'semantic-ui-react';
import {useDropzone} from 'react-dropzone';
import {useCallback} from 'react';

function AvatarFrom({setShowModal}) {

  const [updateAvatar,{data}] = useMutation(UPDATE_AVATAR);

  const onDrop= useCallback(files=>{
    updateAvatar({variables:{
      file:files[0]
    }})
  },[])

  const {getInputProps,getRootProps} = useDropzone({
    accept:'image/*',
    noKeyboard:true,
    multiple:false,
    onDrop
  })
  return (
    <div className="avatar-form">
      <Button {...getRootProps()}>
        Cargar Una foto
      </Button>
      <Button>
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
