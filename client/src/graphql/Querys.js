import {gql} from '@apollo/client';

const QUERY_LOGIN = gql`
  query Query($input: AuthInputLogin) {
    login(input: $input) {
       token
    }
  }
`;
export {
  QUERY_LOGIN
}


