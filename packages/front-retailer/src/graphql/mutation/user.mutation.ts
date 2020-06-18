import gql from "graphql-tag";

export const SIGN_ME_UP = gql`
  mutation($signUpInput: CreateUserInput!) {
    signMeUp(signUpInput: $signUpInput) {
      id
    }
  }
`;
