import gql from "graphql-tag";

export const UPDATE_ME = gql`
  mutation($meInput: String!) {
    updateMe(meInput: $meInput) {
      id
      name
      email
    }
  }
`;

export const SIGN_ME_UP = gql`
  mutation($signUpInput: CreateUserInput!) {
    signMeUp(signUpInput: $signUpInput) {
      id
    }
  }
`;
