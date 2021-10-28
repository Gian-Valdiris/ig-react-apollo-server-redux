


import {gql} from '@apollo/client';

const REGISTER_MUTATION = gql`
  mutation Mutation($input: AuthCreateUser) {
    register(input: $input) {
      email
    }
  }
`;

export {
  REGISTER_MUTATION
}