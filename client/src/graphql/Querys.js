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

const SEARCH = gql `
  query Search($search: String) {
  search(search: $search) {
    name
    username
    avatar
  }
}`;

const IS_FOLLOW = gql`
  query Query($username: String!) {
    isFollow(username: $username)
  }
`;
const GET_FOLLOWERS = gql `
  query Query($username: String!) {
  followers(username: $username) {
    username
    avatar
    name
  }
}`;

const GET_FOLLOWED = gql`
  query Followed($username: String!) {
  followed(username: $username) {
    username
    avatar
    name
  }
}
`;
export {
  QUERY_LOGIN,
  QUERY_GET_USER,
  SEARCH,
  IS_FOLLOW,
  GET_FOLLOWERS,
  GET_FOLLOWED
}


