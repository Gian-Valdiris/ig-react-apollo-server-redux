import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';

import { Dimmer, Loader } from 'semantic-ui-react'

import {QUERY_GET_USER} from '../graphql/Querys';
import Profile from '../components/profile';
import UserNotFound from '../components/user/userNotFound';
import Publications from '../components/publications';

export default function User() {

  const {username} = useParams();
  const {data,loading,error} = useQuery(QUERY_GET_USER,{variables:{username}})

  if (loading){
    return (
      <Dimmer active inverted>
        <Loader size='big'>Loading</Loader>
      </Dimmer>
    )
  }
  if (error){
    return <UserNotFound />
  }
  return (
    <>
    <Profile data = {data} />
    <Publications />
    </>
  )
}