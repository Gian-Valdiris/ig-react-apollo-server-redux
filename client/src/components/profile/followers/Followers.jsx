import './Followers.scss';
import {useQuery} from '@apollo/client';
import {GET_FOLLOWERS} from '../../../graphql/Querys';


function Followers({ username }) {

  const {data:followers} = useQuery(GET_FOLLOWERS,{
    variables:{
      username
    }
  })
  return (
    <div className="followers">
      <p>
        <span>**</span> Publicaciones
      </p>
      <p className='link'>
        <span>{followers?followers.followers.length:0}</span> seguidores
      </p>
      <p className='link'>
        <span>**</span> seguidos
      </p>
    </div>
  );
}

export default Followers;
