import './Followers.scss';
import {useQuery, useSubscription} from '@apollo/client';
import {GET_FOLLOWERS,GET_FOLLOWED} from '../../../graphql/Querys';
import {SUBSCRIPTION_FOLLOWERS} from '../../../graphql/Subscriptions';
import { useEffect, useState } from 'react';
import {Modal} from 'semantic-ui-react';
import {useHistory} from 'react-router-dom';
function Followers({ username }) {
  const [dataProfile, setDataProfile] = useState({ followers:[], followed:[], showModal:false, dataModal:[], titleModal:''})
  const {dataModal,followed,followers,showModal,titleModal} = dataProfile;

  const history = useHistory();
  useQuery(GET_FOLLOWERS,{
    variables:{
      username
    },
    onCompleted(data){
      setDataProfile({
        ...dataProfile,
        followers:data.followers
      })
    }
  })
  useQuery(GET_FOLLOWED,{
    variables:{
      username
    },
    onCompleted(data){
      setDataProfile({
        ...dataProfile,
        followed:data.followed
      })
    }
  })
  const {data} = useSubscription(SUBSCRIPTION_FOLLOWERS,{
    variables:{
      username
    },
  })
  useEffect(()=>{
    if (data){
      setDataProfile({
        ...dataProfile,
        followers:data.followers
      })
    }
  },[data])

  const handleDataModal= (type)=>{
    if (type==='followers'){
      setDataProfile({
        ...dataProfile,
        showModal:true,
        titleModal:'Followers',
        dataModal:followers
      })
    }
    else{
      setDataProfile({
        ...dataProfile,
        showModal:true,
        titleModal:'Followed',
        dataModal:followed
      })
    }

  }
  return (
    <>
    <div className="followers">
      <p>
        <span>**</span> Publicaciones
      </p>
      <p className='link' onClick={()=>handleDataModal('followers')}>
        <span >{followers.length}</span> seguidores
      </p>
      <p className='link'onClick={()=>handleDataModal('followed')} >
        <span>{followed.length}</span> seguidos
      </p>
    </div>
    <Modal open={showModal} size='mini' onClose={()=>setDataProfile({...dataProfile,showModal:false})}  className='modal-followers'>
      {<Modal.Header>{titleModal}</Modal.Header>}
        {dataModal.map(i=>(<div className='user-f' key = {i.username}  onClick={()=>history.push(`/${i.username}`)}>{i.username}</div>))}
    </Modal>

    </>
  );
}

export default Followers;
