import {gql} from '@apollo/client';

const QUERY_LOGIN = gql`
  query Query($input: AuthInputLogin) {
    login(input: $input) {
       token
    }
  }
`;

const QUERY_GET_USER=gql`
  query Query($username: String) {
  getUser(username: $username) {
    username
    avatar
    description
    email
    name
    id
    siteWeb

  }
}
`;
export {
  QUERY_LOGIN,
  QUERY_GET_USER
}


