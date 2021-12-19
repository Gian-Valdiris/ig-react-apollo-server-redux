import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import {useQuery} from '@apollo/client';
import {useMutation} from '@apollo/client';

import {IS_FOLLOW} from '../../../graphql/Querys';
import {FOLLOW,UN_FOLLOW} from '../../../graphql/Mutations';
import ButtonFollow from './ButtomFollow';

import './HeaderProfile.scss';

const HeaderProfile = ({ getUser ,handleModal}) => {
  const { username } = getUser;
  const { username: usernameLoged } = useSelector((s) => s.authReducer.dataUser);
  const {data,loading,refetch}=useQuery(IS_FOLLOW,{variables:{username}});
  const [Follow] = useMutation(FOLLOW,{
    onCompleted(args){
      refetch()
    }
  });
  const [unFollow]=useMutation(UN_FOLLOW,{
    variables:{username},
    onCompleted(args){
      refetch();
    }
  })
  return (
    data?(
    <div className="header-profile">
     <h2>
        {username}
        {username === usernameLoged ? (
          <Button onClick={()=>handleModal('settigns')}>Ajustes</Button>
        ) :(
          !loading && <ButtonFollow data={data} Follow={Follow} unFollow={unFollow} username={username}/>
          )
        }
      </h2>
    </div>):(
      <h1>Cargando...</h1>
    )
  );
};

export default HeaderProfile;
