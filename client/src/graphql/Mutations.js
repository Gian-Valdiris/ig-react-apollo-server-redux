


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

const UPDATE_PROFILE = gql`
  mutation Mutation($input: UpdateUserInput) {
    updateUser(input: $input)
  }
`;

const FOLLOW=gql`
  mutation Mutation($username: String!) {
  follow(username: $username)
}`;

const UN_FOLLOW = gql`
mutation Mutation($username: String!) {
  unFollow(username: $username)
}
`;


const PUBLISH= gql`
  mutation Mutation($file: Upload) {
  publish(file: $file) {
    status
    urlFile
  }
}`;

export {
  REGISTER_MUTATION,
  UPDATE_AVATAR,
  DELETE_AVATAR,
  UPDATE_PROFILE,
  FOLLOW,
  UN_FOLLOW,
  PUBLISH
}