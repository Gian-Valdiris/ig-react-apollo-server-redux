import { useEffect, useState } from 'react';
 // eslint-disable-next-line
import {useHistory,useParams} from 'react-router-dom';
import {Modal} from 'semantic-ui-react';
import {useQuery, useSubscription} from '@apollo/client';
import {SUBSCRIPTION_FOLLOWERS} from '../../../graphql/Subscriptions';
import {useDispatch}  from 'react-redux';


import {GET_FOLLOWERS,GET_FOLLOWED,GET_PUBLICATIONS} from '../../../graphql/Querys';
import {setPublications} from '../../../redux/reducers/publications';
import './Followers.scss';

function Followers({ username }) {
  const [dataProfile, setDataProfile] = useState({ followers:[], followed:[],publications:[], showModal:false, dataModal:[], titleModal:''})
  const {dataModal,followed,followers,publications,showModal,titleModal} = dataProfile;

  const history = useHistory();
  const  dispatch = useDispatch();
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

  useQuery(GET_PUBLICATIONS,{
    variables:{
      username
    },
    onCompleted(data){
      setDataProfile({
        ...dataProfile,
        publications:data.getPublications
      })
      dispatch(setPublications(data.getPublications))
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
    // eslint-disable-next-line 
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
        <span>{publications.length}</span> Publicaciones
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
