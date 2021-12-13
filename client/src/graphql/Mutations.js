


import {gql} from '@apollo/client';

const REGISTER_MUTATION = gql`
  mutation Mutation($input: AuthCreateUser) {
    register(input: $input) {
      email
    }
  }
`;

const UPDATE_AVATAR= gql`
mutation Mutation($file: Upload!) {
  updateAvatar(file: $file) {
    status
    urlAvatar
  }
}`;

const DELETE_AVATAR = gql `

mutation Mutation {
  deleteAvatar
  
}



`;
export {
  REGISTER_MUTATION,
  UPDATE_AVATAR,
  DELETE_AVATAR
}