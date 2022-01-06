import {gql} from '@apollo/client';

const SUBSCRIPTION_FOLLOWERS = gql`
  subscription Subscription($username: String) {
  followers(username: $username) {
    followers {
      username 
    }
  }
}`;
export {
  SUBSCRIPTION_FOLLOWERS
}