import {gql} from '@apollo/client';

const SUBSCRIPTION_FOLLOWERS = gql`
  subscription Subscription($username: String) {
  followers(username: $username) {
    followers {
      username 
    }
  }
}`;

const SUBCRIPTIONS_PUBLICATIONS = gql`
  subscription Subscription($username: String) {
  publications(username: $username) {
    username
    publicaciones {
      file
      createAt
      id
      idUser
      typeFile
    }
  }
}`;

export {
  SUBSCRIPTION_FOLLOWERS,
  SUBCRIPTIONS_PUBLICATIONS
}