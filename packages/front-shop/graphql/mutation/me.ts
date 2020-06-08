import gql from "graphql-tag";

export const UPDATE_ME = gql`
  mutation($meInput: UpdateUserInput!) {
    updateMe(meInput: $meInput) {
      id
      email
      name
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
