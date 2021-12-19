

import {Button} from 'semantic-ui-react';

export default function  ButtonFollow({Follow,unFollow,username,data}){

  if(data.isFollow){
    return (
    <Button  className='btn-danger' onClick={()=>{
      unFollow({variables:{
        username
      }})
    }}>
      Dejar de seguir
    </Button>)
  }
  return (
    <Button  className='btn-action' onClick={()=>Follow({variables:{
      username
    }})}>
      Seguir
    </Button>
  )


}