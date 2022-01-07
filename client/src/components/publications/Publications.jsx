import {useEffect,useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {useSubscription} from '@apollo/client';

import {Grid,Image} from 'semantic-ui-react';
import {SUBCRIPTIONS_PUBLICATIONS} from '../../graphql/Subscriptions';
import './Publications.scss';

const Publications = () => {
  const [publications, setpublications] = useState([])
  const state = useSelector(state=>state.publicationsReducer)|| []
  const {username} = useParams();
  const {data} = useSubscription(SUBCRIPTIONS_PUBLICATIONS,{
    variables:{
      username
    }
  })
  useEffect(()=>{
    setpublications(state.publications)
    // eslint-disable-next-line
  },[])
  useEffect(()=>{ 
    if (data){
      setpublications(data.publications.publicaciones)
    }
  },[data])
  
  return (
    <>
        {/* <h1>Publicaciones</h1>  */}
    <Grid className='publications'>
        <Grid columns={4}>
          {
            publications.map((i,index)=>(
              <Grid.Column key = {index} >
                <Image src={i.file}  style={{width:300,height:300,objectFit:'cover' }} />
              </Grid.Column>
            ))
          }
        </Grid>
    </Grid>
    </>
  )
}
export default Publications
